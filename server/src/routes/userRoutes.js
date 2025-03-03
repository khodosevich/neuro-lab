const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../utils/db');
require('dotenv').config();
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

const generateAccessToken = (user) => {
	return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = async (user) => {
	const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_SECRET, { expiresIn: '7d' });

	await pool.query('INSERT INTO refresh_tokens (user_id, token) VALUES ($1, $2) ON CONFLICT (token) DO NOTHING', [user.id, refreshToken]);

	return refreshToken;
};

router.post('/register', async (req, res) => {
	const { username, password, email } = req.body;

	if (!username || !password || !email) {
		return res.status(400).json({ error: 'All fields are required' });
	}

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const result = await pool.query(
			'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id, username, email, role',
			[username, hashedPassword, email]
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

router.get('/users', authenticateToken, async (req, res) => {
	try {
		const result = await pool.query('SELECT id, username, email, role, created_at FROM users');
		return res.json(result.rows);
	} catch (error) {
		return res.status(500).json({ error: 'Internal server error' });
	}
});

router.get('/user/:id', authenticateToken, async (req, res) => {
	const { id } = req.params;

	try {
		const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
		console.log(result);
		return res.json(result.rows[0]);
	} catch (error) {
		return res.status(500).json({ error: 'Internal server error' });
	}
});

router.put('/users/:id', authenticateToken, async (req, res) => {
	const { id } = req.params;
	const updates = req.body;

	try {
		const fields = Object.keys(updates).filter(key => updates[key] !== undefined);

		if (fields.length === 0) {
			return res.status(400).json({ error: 'No fields to update' });
		}

		const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
		const values = fields.map(field => updates[field]);

		await pool.query(
			`UPDATE users SET ${setClause} WHERE id = $${fields.length + 1}`,
			[...values, id]
		);

		return res.json({ message: 'User updated successfully' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Internal server error' });
	}
});

router.delete('/users/:id', authenticateToken, async (req, res) => {
	const { id } = req.params;

	try {
		await pool.query('DELETE FROM refresh_tokens WHERE user_id = $1', [id]);
		await pool.query('DELETE FROM users WHERE id = $1', [id]);

		return res.json({ message: 'User deleted successfully' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Internal server error' });
	}
});


module.exports = router;