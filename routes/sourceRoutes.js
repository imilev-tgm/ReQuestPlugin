// routes/sourceRoutes.js
const express = require('express');
const router = express.Router();
const sourceController = require('../controllers/sourceController');
const authMiddleware = require('../middleware/auth');

// Example routes
router.get('/', authMiddleware, sourceController.getAllSources);
router.post('/', sourceController.addSource);

module.exports = router; // ✅ Export router