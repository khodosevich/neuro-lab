const express = require('express');
const axios = require('axios');
const pool = require('../utils/db');

const router = express.Router();

const modelCache = new Map();

router.post('/generate', async (req, res) => {
	const { modelId, inputText, chatId, userId } = req.body;

	try {
		console.log(req.body);

		// Валидация
		if (!modelId || !inputText || !chatId || !userId) {
			return res.status(400).json({ error: 'Missing required fields' });
		}

		// Начало замера времени
		const startTime = process.hrtime();

		// Получаем модель
		let model = modelCache.get(modelId);
		if (!model) {
			const dbResult = await pool.query('SELECT * FROM models WHERE id = $1', [modelId]);
			if (dbResult.rows.length === 0) {
				return res.status(404).json({ error: 'Model not found' });
			}
			model = dbResult.rows[0];
			modelCache.set(modelId, model);
		}

		// Определяем тип модели
		let modelType;
		switch (model.id) {
			case 1: modelType = 'text_generation'; break;
			case 4: modelType = 'translation'; break;
			case 8: modelType = 'bert'; break;
			case 9: modelType = 'gpt_neo'; break;
			case 10: modelType = 'ticket_classifier'; break;
			default:
				return res.status(400).json({ error: 'Unsupported model type' });
		}

		// Отправляем запрос к модели
		const response = await axios.post('http://localhost:8001/run-model', {
			input_text: inputText,
			model_url: model.model_url,
			model_type: modelType,
		}, { timeout: 100000 });

		const botResponse = response.data.output;

		// Замер времени выполнения
		const elapsedTime = process.hrtime(startTime);
		const responseTimeMs = Math.round(elapsedTime[0] * 1000 + elapsedTime[1] / 1000000);

		// Сохраняем метрики
		await pool.query(
			`INSERT INTO model_metrics 
       (model_id, user_id, response_time_ms, input_length, output_length, success)
       VALUES ($1, $2, $3, $4, $5, $6)`,
			[modelId, userId, responseTimeMs, inputText.length, botResponse.length, true]
		);

		res.json({
			output: botResponse,
			metrics: {
				response_time_ms: responseTimeMs,
				input_length: inputText.length,
				output_length: botResponse.length
			}
		});

	} catch (error) {
		console.error('Error in /generate:', error);

		// Сохраняем метрики ошибки
		if (userId && modelId) {
			await pool.query(
				`INSERT INTO model_metrics 
         (model_id, user_id, response_time_ms, input_length, output_length, success, error_message)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
				[modelId, userId, 0, inputText?.length || 0, 0, false, error.message]
			);
		}

		if (error.response) {
			res.status(error.response.status).json({ error: error.response.data });
		} else if (error.request) {
			res.status(500).json({ error: 'No response from model server' });
		} else {
			res.status(500).json({ error: 'Internal server error' });
		}
	}
});

module.exports = router;