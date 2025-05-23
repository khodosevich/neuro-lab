const express = require('express');
const pool = require('../utils/db');

const router = express.Router();

// Создание комментария (без username)
router.post('/create', async (req, res) => {
	const { modelId, userId, content } = req.body;

	try {
		const newComment = await pool.query(
			`INSERT INTO comments (model_id, user_id, content)
             VALUES ($1, $2, $3)
                 RETURNING *`,
			[modelId, userId, content]
		);

		res.status(201).json({
			message: 'Comment added successfully',
			comment: newComment.rows[0]
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Получение комментариев с username (JOIN с таблицей users)
router.get('/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const comments = await pool.query(
			`SELECT c.*, u.username
             FROM comments c
                      LEFT JOIN users u ON c.user_id = u.id
             WHERE c.model_id = $1
             ORDER BY c.created_at DESC`,
			[id]
		);

		// Форматируем результат, чтобы username был null, если пользователь не найден
		const formattedComments = comments.rows.map(comment => ({
			...comment,
			username: comment.username || 'Аноним'
		}));

		res.status(200).json(formattedComments);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Удаление комментария (сначала получаем username)
router.delete('/delete/:id', async (req, res) => {
	const { id } = req.params;

	try {
		// Сначала получаем комментарий с username
		const commentWithUser = await pool.query(
			`SELECT c.*, u.username
             FROM comments c
                      LEFT JOIN users u ON c.user_id = u.id
             WHERE c.id = $1`,
			[id]
		);

		if (commentWithUser.rows.length === 0) {
			return res.status(404).json({ error: 'Comment not found' });
		}

		// Затем удаляем
		await pool.query('DELETE FROM comments WHERE id = $1', [id]);

		res.status(200).json({
			message: 'Comment deleted successfully',
			deletedComment: {
				...commentWithUser.rows[0],
				username: commentWithUser.rows[0].username || 'Аноним'
			}
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Обновление комментария (возвращаем с username)
router.put('/update/:id', async (req, res) => {
	const { id } = req.params;
	const { content } = req.body;

	try {
		// Обновляем комментарий
		await pool.query(
			`UPDATE comments
       SET content = COALESCE($1, content), 
           updated_at = NOW()
       WHERE id = $2`,
			[content, id]
		);

		// Получаем обновленный комментарий с username
		const updatedComment = await pool.query(
			`SELECT c.*, u.username
             FROM comments c
                      LEFT JOIN users u ON c.user_id = u.id
             WHERE c.id = $1`,
			[id]
		);

		if (updatedComment.rows.length === 0) {
			return res.status(404).json({ error: 'Comment not found' });
		}

		res.status(200).json({
			message: 'Comment updated successfully',
			comment: {
				...updatedComment.rows[0],
				username: updatedComment.rows[0].username || 'Аноним'
			}
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

module.exports = router;