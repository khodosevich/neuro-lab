const express = require('express');
const pool = require('../utils/db');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeAdmin = require('../middleware/authorizeAdmin');

const router = express.Router();

// 🔹 Создание модели (только для админов)
router.post('/create', authenticateToken, authorizeAdmin, async (req, res) => {
	const { name, description, modelUrl, datasetUrl, parameters } = req.body;

	try {
		const newModel = await pool.query(
			`INSERT INTO models (name, description, model_url, dataset_url, parameters)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id, name, description, model_url, dataset_url, parameters, created_at, updated_at`,
			[name, description, modelUrl, datasetUrl, parameters || {}]
		);

		res.status(201).json({
			message: 'Model created successfully',
			model: newModel.rows[0]
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// 🔹 Удаление модели (только для админов)
router.delete('/delete/:id', authenticateToken, authorizeAdmin, async (req, res) => {
	const { id } = req.params;

	try {
		const existingModel = await pool.query('SELECT * FROM models WHERE id = $1', [id]);

		if (existingModel.rows.length === 0) {
			return res.status(404).json({ error: 'Model not found' });
		}

		await pool.query('DELETE FROM models WHERE id = $1', [id]);

		res.status(200).json({ message: 'Model deleted successfully' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// 🔹 Обновление модели (только для админов)
router.put('/update/:id', authenticateToken, authorizeAdmin, async (req, res) => {
	const { id } = req.params;
	const { name, description, model_url, dataset_url, parameters } = req.body;

	try {
		const updatedModel = await pool.query(
			`UPDATE models
             SET name = COALESCE($1, name),
                 description = COALESCE($2, description),
                 model_url = COALESCE($3, model_url),
                 dataset_url = COALESCE($4, dataset_url),
                 parameters = COALESCE($5, parameters),
                 updated_at = NOW()
             WHERE id = $6
             RETURNING id, name, description, model_url, dataset_url, parameters, created_at, updated_at`,
			[name, description, model_url, dataset_url, parameters, id]
		);

		if (updatedModel.rows.length === 0) {
			return res.status(404).json({ error: 'Model not found' });
		}

		res.status(200).json({
			message: 'Model updated successfully',
			model: updatedModel.rows[0]
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// 🔹 Получение списка моделей (доступно всем)
router.get('/list', async (req, res) => {
	try {
		const models = await pool.query('SELECT * FROM models ORDER BY created_at DESC');
		res.status(200).json(models.rows);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// 🔹 Получение одной модели (доступно всем)
router.get('/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const model = await pool.query('SELECT id, name, description, model_url, dataset_url, parameters, created_at FROM models WHERE id = $1', [id]);

		if (model.rows.length === 0) {
			return res.status(404).json({ error: 'Model not found' });
		}

		res.status(200).json(model.rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

router.get('/metrics/:modelId', authenticateToken, async (req, res) => {
	try {
		const { modelId } = req.params;
		const { period = '24h' } = req.query;

		// Получаем агрегированную статистику
		const stats = await pool.query(
			`SELECT 
         DATE_TRUNC('hour', request_time) as time_window,
         COUNT(*) as request_count,
         AVG(response_time_ms) as avg_response_time,
         AVG(input_length) as avg_input_length,
         AVG(output_length) as avg_output_length,
         SUM(CASE WHEN success THEN 1 ELSE 0 END) as success_count,
         SUM(CASE WHEN NOT success THEN 1 ELSE 0 END) as error_count
       FROM model_metrics
       WHERE model_id = $1 
         AND request_time > NOW() - INTERVAL '${period}'
       GROUP BY time_window
       ORDER BY time_window ASC`,
			[modelId]
		);

		res.json(stats.rows);
	} catch (err) {
		console.error('Error getting metrics:', err);
		res.status(500).json({ error: 'Database error' });
	}
});

module.exports = router;