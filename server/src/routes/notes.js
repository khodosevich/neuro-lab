const express = require('express');
const pool = require('../utils/db');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// 🔹 Получение заметок для модели (только для авторизованных пользователей)
router.get('/all', authenticateToken, async (req, res) => {
	const { userId, modelId } = req.query;

	try {
		const notes = await pool.query(
			`SELECT id, title, content, created_at, updated_at 
       FROM notes 
       WHERE user_id = $1 AND model_id = $2 
       ORDER BY created_at DESC`,
			[userId, modelId]
		);

		res.status(200).json(notes.rows);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// 🔹 Создание заметки (только для авторизованных пользователей)
router.post('/', authenticateToken, async (req, res) => {
	const { user_id, model_id, title, content } = req.body;

	if (!title || !content) {
		return res.status(400).json({ error: 'Title and content are required' });
	}

	try {
		const newNote = await pool.query(
			`INSERT INTO notes (user_id, model_id, title, content)
       VALUES ($1, $2, $3, $4)
       RETURNING id, title, content, created_at, updated_at`,
			[user_id, model_id, title, content]
		);

		res.status(201).json({
			message: 'Note created successfully',
			note: newNote.rows[0]
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// 🔹 Обновление заметки (только владельцу заметки)
router.put('/:id', authenticateToken, async (req, res) => {
	const { id } = req.params;
	const { user_id, title, content } = req.body;

	try {
		// Проверяем, что заметка принадлежит пользователю
		const existingNote = await pool.query(
			'SELECT * FROM notes WHERE id = $1 AND user_id = $2',
			[id, user_id]
		);

		if (existingNote.rows.length === 0) {
			return res.status(404).json({
				error: 'Note not found or access denied'
			});
		}

		const updatedNote = await pool.query(
			`UPDATE notes
       SET title = COALESCE($1, title),
           content = COALESCE($2, content),
           updated_at = NOW()
       WHERE id = $3
       RETURNING id, title, content, created_at, updated_at`,
			[title, content, id]
		);

		res.status(200).json({
			message: 'Note updated successfully',
			note: updatedNote.rows[0]
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// 🔹 Удаление заметки (только владельцу заметки)
router.delete('/:id', authenticateToken, async (req, res) => {
	const { id } = req.params;
	const { user_id } = req.body;

	try {
		// Проверяем, что заметка принадлежит пользователю
		const existingNote = await pool.query(
			'SELECT * FROM notes WHERE id = $1 AND user_id = $2',
			[id, user_id]
		);

		if (existingNote.rows.length === 0) {
			return res.status(404).json({
				error: 'Note not found or access denied'
			});
		}

		await pool.query('DELETE FROM notes WHERE id = $1', [id]);

		res.status(200).json({ message: 'Note deleted successfully' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

module.exports = router;