const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Подключаем CORS
const userRoutes = require('./routes/auth');
const testRoute = require('./routes/test');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(bodyParser.json());
app.use('/auth', userRoutes);
app.use('/', testRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});