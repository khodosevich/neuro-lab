const express = require('express');
const pool = require('../utils/db');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// 🔹 Получение сообщений чата
router.get('/messages', authenticateToken, async (req, res) => {
	const { chat_id } = req.query;
	const userId = req.user.id;

	if (!chat_id) {
		return res.status(400).json({ error: 'chat_id is required' });
	}

	try {
		const messages = await pool.query(
			`SELECT
                 id,
                 chat_id,
                 user_id, 
                 model_id,
                 sender,
                 message_text as text,
                 TO_CHAR(created_at, 'HH24:MI') as timestamp
             FROM chat_messages
             WHERE user_id = $1 AND chat_id = $2 
             ORDER BY created_at ASC`,
			[userId, chat_id]
		);

		console.log(messages.rows);

		res.status(200).json(messages.rows);
	} catch (err) {
		console.error('Error fetching messages:', err);
		res.status(500).json({ error: 'Database error' });
	}
});

// 🔹 Сохранение сообщения
router.post('/messages', authenticateToken, async (req, res) => {
	const { chat_id, sender, text, model_id } = req.body;
	const userId = req.user.id;

	console.log(userId);

	try {
		const newMessage = await pool.query(
			`INSERT INTO chat_messages
                 (chat_id, user_id, model_id, sender, message_text)
             VALUES ($1, $2, $3, $4, $5) RETURNING id, chat_id, user_id, model_id, sender, message_text as text, TO_CHAR(created_at, 'HH24:MI') as timestamp`,
			[chat_id, userId, model_id, sender, text],
		);

		console.log(newMessage.rows[0]);

		res.status(201).json(newMessage.rows[0]);
	}
	catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// 🔹 Удаление истории чата
router.delete('/messages', authenticateToken, async (req, res) => {
	const { chat_id } = req.query;
	const userId = req.user.id;

	try {
		await pool.query(
			`DELETE
             FROM chat_messages
             WHERE chat_id = $1
               AND user_id = $2`,
			[chat_id, userId],
		);

		res.status(200).json({ message: 'Chat history cleared' });
	}
	catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

module.exports = router;