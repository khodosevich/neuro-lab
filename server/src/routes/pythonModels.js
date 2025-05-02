const express = require('express');
const axios = require('axios');
const pool = require('../utils/db');

const router = express.Router();

const modelCache = new Map();

router.post('/generate', async (req, res) => {
	try {
		const { modelId, inputText, chatId, userId } = req.body;

		// Валидация
		if (!modelId || !inputText || !chatId || !userId) {
			return res.status(400).json({ error: 'Missing required fields' });
		}

		// Проверка кэша
		let model = modelCache.get(modelId);
		if (!model) {
			const dbResult = await pool.query('SELECT * FROM models WHERE id = $1', [modelId]);
			if (dbResult.rows.length === 0) {
				return res.status(404).json({ error: 'Model not found' });
			}
			model = dbResult.rows[0];
			modelCache.set(modelId, model);
		}

		let modelType;
		switch (model.id) {
			case 1: modelType = 'text_generation'; break;
			case 4: modelType = 'translation'; break;
			case 8: modelType = 'bert'; break;
			default:
				return res.status(400).json({ error: 'Unsupported model type' });
		}

		// Получаем ответ от модели
		const response = await axios.post('http://localhost:8001/run-model', {
			input_text: inputText,
			model_url: model.model_url,
			model_type: modelType,
		}, { timeout: 10000 });

		const botResponse = response.data.output;

		res.json({
			output: botResponse,
		});

	} catch (error) {
		console.error('Error in /generate:', error);
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