const express = require('express');
const pool = require('../utils/db');

const router = express.Router();

router.post('/create', async (req, res) => {
	const { modelId, userId, content } = req.body;

	try {
		const newComment = await pool.query(
			`INSERT INTO comments (model_id, user_id, content) 
             VALUES ($1, $2, $3) RETURNING *`,
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

router.get('/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const comments = await pool.query(
			'SELECT * FROM comments WHERE model_id = $1 ORDER BY created_at DESC',
			[id]
		);

		res.status(200).json(comments.rows);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

router.delete('/delete/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const existingComment = await pool.query('SELECT * FROM comments WHERE id = $1', [id]);

		if (existingComment.rows.length === 0) {
			return res.status(404).json({ error: 'Comment not found' });
		}

		await pool.query('DELETE FROM comments WHERE id = $1', [id]);

		res.status(200).json({ message: 'Comment deleted successfully' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

router.put('/update/:id', async (req, res) => {
	const { id } = req.params;
	const { content } = req.body;

	try {
		const updatedComment = await pool.query(
			`UPDATE comments
             SET content = COALESCE($1, content), updated_at = NOW()
             WHERE id = $2
             RETURNING *`,
			[content, id]
		);

		if (updatedComment.rows.length === 0) {
			return res.status(404).json({ error: 'Comment not found' });
		}

		res.status(200).json({
			message: 'Comment updated successfully',
			comment: updatedComment.rows[0]
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

module.exports = router;