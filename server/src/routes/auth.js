const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../utils/db');

const router = express.Router();
const JWT_SECRET = 'random-1';

router.post('/sign-up', async (req, res) => {
	const { email, password, username } = req.body;

	try {
		const existingEmailUser = await pool.query(
			'SELECT * FROM users WHERE email = $1',
			[email],
		);

		const existingUsernameUser = await pool.query(
			'SELECT * FROM users WHERE username = $1',
			[username],
		);

		if (existingEmailUser.rows.length > 0) {
			return res.status(400).json({ error: 'User with this email already exists' });
		}

		if (existingUsernameUser.rows.length > 0) {
			return res.status(400).json({ error: 'Username already taken' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await pool.query(
			`INSERT INTO users (email, username, password)
             VALUES ($1, $2, $3) RETURNING id, email, username`,
			[email, username, hashedPassword],
		);

		const token = jwt.sign(
			{
				userId: newUser.rows[0].id,
				email: newUser.rows[0].email,
				username: newUser.rows[0].username
			}, JWT_SECRET,
			{ expiresIn: '1h' });

		res.status(201).json({
			message: 'User registered successfully',
			token
		});
	}
	catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

router.post('/sign-in', async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

		if (user.rows.length === 0) {
			return res.status(400).json({ error: 'Invalid email or password' });
		}

		const validPassword = await bcrypt.compare(password, user.rows[0].password);

		if (!validPassword) {
			return res.status(400).json({ error: 'Invalid email or password' });
		}

		const token = jwt.sign(
			{
				userId: user.rows[0].id,
				email: user.rows[0].email,
				username: user.rows[0].username,
			},
			JWT_SECRET,
			{ expiresIn: '1h' },
		);

		res.status(200).json({
			message: 'User signed in successfully',
			token,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

router.delete('/delete', async (req, res) => {
	const { userId } = req.body;

	try {
		const user = await pool.query(
			'SELECT * FROM users WHERE id = $1',
			[userId],
		);

		if (user.rows.length === 0) {
			return res.status(404).json({ error: 'User not found' });
		}

		await pool.query('DELETE FROM users WHERE id = $1', [userId]);

		res.status(200).json({ message: 'User deleted successfully' });
	}
	catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

module.exports = router;