const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');
const modelsRoutes = require('./src/routes/models');
const commentsRoutes = require('./src/routes/comments');
const datasets = require('./src/routes/datasets');
const authenticateToken = require('./src/middleware/authenticateToken');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(bodyParser.json());

app.use((req, res, next) => {
  if (req.path.startsWith('/auth') || req.path.startsWith('/models')) {
    return next();
  }
  authenticateToken(req, res, next);
});

app.use('/auth', userRoutes);
app.use('/models', modelsRoutes);
app.use('/comments', commentsRoutes);
app.use('/datasets', datasets);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});