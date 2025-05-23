from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import (GPT2Tokenizer, GPT2LMHeadModel,
                          MarianMTModel, MarianTokenizer,
                          BertTokenizer, AutoTokenizer, AutoModelForCausalLM)
import logging
from functools import lru_cache
import asyncio
import torch
import onnxruntime as ort
app = FastAPI()

# Конфигурация
MODEL_CONFIG = {
    "text_generation": {
        "tokenizer": "openai-community/gpt2",
        "model": "openai-community/gpt2"
    },
    "translation": {
        "tokenizer": "Helsinki-NLP/opus-mt-en-ru",
        "model": "Helsinki-NLP/opus-mt-en-ru"
    },
    "gpt_neo": {
        "tokenizer": "EleutherAI/gpt-neo-125M",
        "model": "EleutherAI/gpt-neo-125M"
    },
    "ticket_classifier": {
        "model_path": "./models/ticket_classifier.onnx",
        "tokenizer": "./models/ticket_classifier"
    }
}

category_mapping = {
    "hardware": 0,
    "network": 1,
    "software": 2,
    "access": 3,
    "accounts": 4,
    "security": 5,
    "maintenance": 6,
    "undefined": 7
}

priority_mapping = {
    "low": 0,
    "medium": 1,
    "high": 2,
    "critical": 3
}

reverse_category_mapping = {v: k for k, v in category_mapping.items()}
reverse_priority_mapping = {v: k for k, v in priority_mapping.items()}

# Кэш для моделей
@lru_cache(maxsize=2)
def load_model(model_type: str):
    try:
        config = MODEL_CONFIG[model_type]
        if model_type == "text_generation":
            tokenizer = GPT2Tokenizer.from_pretrained(config["tokenizer"])
            model = GPT2LMHeadModel.from_pretrained(config["model"])
        elif model_type == "translation":
            tokenizer = MarianTokenizer.from_pretrained(config["tokenizer"])
            model = MarianMTModel.from_pretrained(config["model"])
        elif model_type == "gpt_neo":
            tokenizer = AutoTokenizer.from_pretrained(config["tokenizer"])
            model = AutoModelForCausalLM.from_pretrained(config["model"])
        elif model_type == "ticket_classifier":
            tokenizer = BertTokenizer.from_pretrained(config["tokenizer"])
            session = ort.InferenceSession(config["model_path"])
            return tokenizer, session
        return tokenizer, model
    except Exception as e:
        logging.error(f"Error loading {model_type} model: {e}")
        raise

class InferenceRequest(BaseModel):
    input_text: str
    model_type: str
    model_url: str = None  # Пока не используется, но может пригодиться

@app.on_event("startup")
async def startup_event():
    # Предзагрузка моделей асинхронно
    for model_type in MODEL_CONFIG:
        try:
            await asyncio.to_thread(load_model, model_type)
            logging.info(f"Successfully pre-loaded {model_type} model")
        except Exception as e:
            logging.error(f"Failed to pre-load {model_type} model: {e}")


@app.post("/run-model")
async def run_model(req: InferenceRequest):
    try:
        tokenizer, model = load_model(req.model_type)
        inputs = tokenizer(req.input_text, return_tensors="pt", truncation=True, max_length=512)


        if req.model_type == "ticket_classifier":
            tokenizer, session = load_model(req.model_type)

            ort_inputs = {
                "input_ids": inputs["input_ids"].numpy(),
                "attention_mask": inputs["attention_mask"].numpy()
            }

            outputs = session.run(None, ort_inputs)
            logits = outputs[0]  # [batch_size, num_classes]

            category_probs = torch.nn.functional.softmax(torch.tensor(logits), dim=-1)
            predicted_category = torch.argmax(category_probs).item()
            category_confidence = category_probs[0][predicted_category].item()

            predicted_priority = predicted_category
            priority_confidence = category_confidence
            generated_text = f"Заявка \"{req.input_text}\" будет иметь категорию \"{reverse_category_mapping.get(predicted_category, 'unknown')}\" ({category_confidence:.2%}) и приоритет \"{reverse_priority_mapping.get(predicted_priority, 'unknown')}\" ({priority_confidence:.2%})."

            return {"output": generated_text}
        else:
            outputs = model.generate(
                **inputs,
                max_length=150,
                eos_token_id=tokenizer.eos_token_id if tokenizer.eos_token_id else tokenizer.encode("")[0],
                early_stopping=True,
                no_repeat_ngram_size=3,
                repetition_penalty=1.5,
                top_p=0.9,
                temperature=0.7,
                do_sample=True
            )
            generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
            return {"output": generated_text}

    except KeyError:
        raise HTTPException(status_code=400, detail="Unsupported model type")
    except Exception as e:
        logging.error(f"Inference error: {e}")
        raise HTTPException(status_code=500, detail="Model processing error")


 #uvicorn models:app --host 0.0.0.0 --port 8001 --reload
