const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');
const pool = require('../utils/db');

const router = express.Router();

const URL = 'https://pkspfxpwfufzfgjnklwp.supabase.co';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrc3BmeHB3ZnVmemZnam5rbHdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2MTIxOTUsImV4cCI6MjA1MzE4ODE5NX0.GSLQUtrUz4bRMQj2JNfGIsTnPDjAyB_EHeP2YxjFjqw';

const supabase = createClient(URL, KEY);

router.post('/sign-up', async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return res.status(400).json({ error: error.message });

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (email, username, password) VALUES ($1, $2, $3)',
      [email, username, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully', data });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/sign-in', async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ email }, 'bsuir-top-matvey', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/delete', async (req, res) => {
  const { email } = req.body;

  try {
    const { error } = await supabase.auth.admin.deleteUser(email);
    if (error) return res.status(400).json({ error: error.message });

    await pool.query('DELETE FROM users WHERE email = $1', [email]);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Создание администратора
router.get('/create-admin', async (req, res) => {
  const { email, password, username } = {
    "email": "testemail@gmail.com",
    "password": "root1234",
    "username": "adminUser"
  };

  console.log(email, password, username);

  try {
    // Проверяем, есть ли пользователь с таким email
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return res.status(400).json({ error: error.message });

    // Хэшируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Добавляем пользователя с ролью "admin" в базу данных
    await pool.query(
      'INSERT INTO users (email, username, password) VALUES ($1, $2, $3)',
      [email, username, hashedPassword]
    );

    res.status(201).json({ message: 'Admin user created successfully', data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;