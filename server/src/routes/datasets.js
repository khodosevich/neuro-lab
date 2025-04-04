const express = require('express');
const router = express.Router();
const pool = require('../../src/utils/db'); // Подключение к БД

// Создание датасета
router.post('/create', async (req, res) => {
	const { name, description, dataset_url, model_id } = req.body;
	try {
		const newDataset = await pool.query(
			'INSERT INTO datasets (name, description, dataset_url, model_id) VALUES ($1, $2, $3, $4) RETURNING *',
			[name, description, dataset_url, model_id]
		);
		res.json(newDataset.rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Получение списка датасетов
router.get('/list', async (req, res) => {
	try {
		const datasets = await pool.query('SELECT * FROM datasets');
		res.json(datasets.rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Получение одного датасета по ID
router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const dataset = await pool.query('SELECT * FROM datasets WHERE id = $1', [id]);
		if (dataset.rows.length === 0) {
			return res.status(404).json({ error: 'Dataset not found' });
		}
		res.json(dataset.rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Обновление датасета
router.put('/update/:id', async (req, res) => {
	const { id } = req.params;
	const { name, description, dataset_url, model_id } = req.body;
	try {
		const updatedDataset = await pool.query(
			'UPDATE datasets SET name = $1, description = $2, dataset_url = $3, model_id = $4, updated_at = NOW() WHERE id = $5 RETURNING *',
			[name, description, dataset_url, model_id, id]
		);
		if (updatedDataset.rows.length === 0) {
			return res.status(404).json({ error: 'Dataset not found' });
		}
		res.json(updatedDataset.rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Удаление датасета
router.delete('/delete/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const deletedDataset = await pool.query('DELETE FROM datasets WHERE id = $1 RETURNING *', [id]);
		if (deletedDataset.rows.length === 0) {
			return res.status(404).json({ error: 'Dataset not found' });
		}
		res.json({ message: 'Dataset deleted', dataset: deletedDataset.rows[0] });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;