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
		const result = await pool.query('SELECT id, username, email, role FROM users WHERE id = $1', [id]);

		if (result.rows.length === 0) {
			return res.status(404).json({ error: 'User not found' });
		}

		return res.json(result.rows[0]);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Internal server error' });
	}
});

router.put('/users/:id', authenticateToken, async (req, res) => {
	const { id } = req.params;
	const { oldPassword, password, ...updates } = req.body;

	try {
		const fields = Object.keys(updates).filter(key => updates[key] !== undefined);

		if (fields.length === 0 && !password) {
			return res.status(400).json({ error: 'No fields to update' });
		}

		if (updates.email || updates.username) {
			const checkQuery = `
                SELECT id FROM users WHERE (email = $1 OR username = $2) AND id != $3`;
			const checkValues = [updates.email || null, updates.username || null, id];

			const existingUser = await pool.query(checkQuery, checkValues);

			if (existingUser.rows.length > 0) {
				return res.status(409).json({ error: 'Email or username already in use' });
			}
		}

		if (password) {
			if (!oldPassword) {
				return res.status(400).json({ error: 'Old password is required' });
			}

			const userQuery = await pool.query('SELECT password FROM users WHERE id = $1', [id]);
			if (userQuery.rows.length === 0) {
				return res.status(404).json({ error: 'User not found' });
			}

			const hashedPassword = userQuery.rows[0].password;

			const isMatch = await bcrypt.compare(oldPassword, hashedPassword);
			if (!isMatch) {
				return res.status(401).json({ error: 'Incorrect old password' });
			}

			const saltRounds = 10;
			updates.password = await bcrypt.hash(password, saltRounds);
		}

		const setClause = Object.keys(updates)
			.map((field, index) => `${field} = $${index + 1}`)
			.join(', ');

		const values = Object.values(updates);

		await pool.query(
			`UPDATE users SET ${setClause} WHERE id = $${values.length + 1}`,
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