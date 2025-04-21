const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../utils/db');
require('dotenv').config();
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.get('/all', authenticateToken, async (req, res) => {
	try {
		const result = await pool.query('SELECT id, username, email, role, created_at FROM users');
		return res.json(result.rows);
	} catch (error) {
		return res.status(500).json({ error: 'Internal server error' });
	}
});

router.get('/userById/:id', authenticateToken, async (req, res) => {
	const { id } = req.params;

	try {
		const result = await pool.query('SELECT id, username, email, role, created_at FROM users WHERE id = $1', [id]);

		if (result.rows.length === 0) {
			return res.status(404).json({ error: 'User not found' });
		}

		return res.json(result.rows[0]);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Internal server error' });
	}
});

router.put('/:id', authenticateToken, async (req, res) => {
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

router.delete('/:id', authenticateToken, async (req, res) => {
	const { id } = req.params;

	try {
		await pool.query('DELETE FROM comments WHERE user_id = $1', [id]);

		await pool.query('DELETE FROM refresh_tokens WHERE user_id = $1', [id]);

		await pool.query('DELETE FROM users WHERE id = $1', [id]);

		return res.json({ message: 'User deleted successfully' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Internal server error' });
	}
});

router.put('/:id/role', authenticateToken, async (req, res) => {
	const { id } = req.params;
	const { role } = req.body;

	console.log(id);
	console.log(role);

	if (!role) {
		return res.status(400).json({ error: 'Role is required' });
	}

	try {
		await pool.query('UPDATE users SET role = $1 WHERE id = $2', [role, id]);

		return res.json({ message: 'User role updated successfully' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Internal server error' });
	}
});

module.exports = router;