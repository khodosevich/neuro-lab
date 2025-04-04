const express = require('express');
const router = express.Router();
const pool = require('../../src/utils/db'); // Подключение к БД

// 📌 Создание новой заметки
router.post('/create', async (req, res) => {
	const { user_id, title, content } = req.body;

	if (!user_id || !title || !content) {
		return res.status(400).json({ error: 'Все поля обязательны' });
	}

	try {
		const newNote = await pool.query(
			'INSERT INTO notes (user_id, title, content) VALUES ($1, $2, $3) RETURNING *',
			[user_id, title, content]
		);
		res.status(201).json(newNote.rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// 📌 Получение списка всех заметок
router.get('/list', async (req, res) => {
	try {
		const notes = await pool.query('SELECT * FROM notes ORDER BY created_at DESC');
		res.json(notes.rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// 📌 Получение конкретной заметки по ID
router.get('/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const note = await pool.query('SELECT * FROM notes WHERE id = $1', [id]);

		if (note.rows.length === 0) {
			return res.status(404).json({ error: 'Заметка не найдена' });
		}

		res.json(note.rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// 📌 Обновление заметки
router.put('/update/:id', async (req, res) => {
	const { id } = req.params;
	const { title, content } = req.body;

	if (!title || !content) {
		return res.status(400).json({ error: 'Все поля обязательны' });
	}

	try {
		const updatedNote = await pool.query(
			'UPDATE notes SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
			[title, content, id]
		);

		if (updatedNote.rows.length === 0) {
			return res.status(404).json({ error: 'Заметка не найдена' });
		}

		res.json(updatedNote.rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// 📌 Удаление заметки
router.delete('/delete/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const deletedNote = await pool.query('DELETE FROM notes WHERE id = $1 RETURNING *', [id]);

		if (deletedNote.rows.length === 0) {
			return res.status(404).json({ error: 'Заметка не найдена' });
		}

		res.json({ message: 'Заметка удалена', note: deletedNote.rows[0] });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
