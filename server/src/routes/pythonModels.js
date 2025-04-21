const express = require('express');
const axios = require('axios');
const pool = require('../utils/db');

const router = express.Router();

router.post('/generate', async (req, res) => {
	const { modelId, inputText } = req.body;

	const model = await pool.query('SELECT * FROM models WHERE id = $1', [modelId]);

	console.log(model.rows[0].id);

	let modelType;
	switch (model.rows[0].id) {
		case 1:
			modelType = 'text_generation';
			break;
		case 4:
			modelType = 'translation';
			break;
		default:
			break;
	}

	const response = await axios.post('http://localhost:8001/run-model', {
		input_text: inputText,
		model_url: model.rows[0].model_url,
		model_type: modelType,
	});

	res.json({ output: response.data.output });
});

module.exports = router;