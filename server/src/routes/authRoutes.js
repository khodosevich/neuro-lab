const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../utils/db');
require('dotenv').config();

const router = express.Router();

const generateAccessToken = (user) => {
	return jwt.sign({ id: user.id, role: user.role, created_at: user.created_at }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = async (user) => {
	console.log('generateRefreshToken', user);
	const refreshToken = jwt.sign({ id: user.id, role: user.role }, process.env.REFRESH_SECRET, { expiresIn: '7d' });

	await pool.query('INSERT INTO refresh_tokens (user_id, token) VALUES ($1, $2) ON CONFLICT (token) DO NOTHING', [user.id, refreshToken]);

	return refreshToken;
};

router.post('/register', async (req, res) => {
	const { username, password, email, role } = req.body;

	if (!username || !password || !email) {
		return res.status(400).json({ error: 'All fields are required' });
	}

	const allowedRoles = ['user', 'admin'];
	const assignedRole = allowedRoles.includes(role) ? role : 'user';

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const result = await pool.query(
			'INSERT INTO users (username, password, email, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role',
			[username, hashedPassword, email, assignedRole]
		);

		const newUser = result.rows[0];

		const accessToken = generateAccessToken(newUser);
		const refreshToken = await generateRefreshToken(newUser);

		res.status(201).json({ user: newUser, accessToken, refreshToken });
	} catch (error) {
		console.error(error);
		if (error.code === '23505') {
			res.status(400).json({ error: 'Username or email already exists' });
		} else {
			res.status(500).json({ error: 'Internal server error' });
		}
	}
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ error: 'All fields are required' });
	}

	try {
		const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
		const user = result.rows[0];

		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(400).json({ error: 'Invalid credentials' });
		}

		const accessToken = generateAccessToken(user);
		const refreshToken = await generateRefreshToken(user);

		res.json({ accessToken, refreshToken });
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});

router.post('/refresh', async (req, res) => {
	const { token } = req.body;

	if (!token) return res.status(401).json({ error: 'Refresh token required' });

	try {
		const result = await pool.query('SELECT * FROM refresh_tokens WHERE token = $1', [token]);
		if (result.rows.length === 0) return res.status(403).json({ error: 'Invalid refresh token' });

		jwt.verify(token, process.env.REFRESH_SECRET, async (err, user) => {
			if (err) return res.status(403).json({ error: 'Invalid refresh token' });

			const newAccessToken = generateAccessToken({ id: user.id, role: user.role });
			res.json({ accessToken: newAccessToken });
		});
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});

router.post('/logout', async (req, res) => {
	const token = req.headers.authorization.replace('Bearer ', '');

	if (!token) return res.status(400).json({ error: 'Refresh token required' });

	try {
		await pool.query('DELETE FROM refresh_tokens WHERE token = $1', [token]);
		res.json({ message: 'Logged out successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});

module.exports = router;