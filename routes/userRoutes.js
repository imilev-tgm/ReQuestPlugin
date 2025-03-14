// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/adminMiddleware');
const userController = require('../controllers/userController');
const User = require('../models/User'); // 👈 Fehlender Import


// Public routes (NO authentication needed)
router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);

// In userRoutes.js (the /me endpoint)
router.get('/me', authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.user.userId)
        .select('username email questcounter created_at') // Explicitly include fields
        .lean();
  
      if (!user) return res.status(404).json({ message: 'User not found' });
      
      res.json({
        ...user,
        questcounter: user.questcounter || 0 // Ensure default value
      });
      
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Error fetching user' });
    }
  });
// Apply authMiddleware to ALL routes below
router.use(authMiddleware);

// Admin-only routes
router.get('/', adminMiddleware, userController.getAllUsers);
router.delete('/:id', adminMiddleware, userController.deleteUser);

// Regular user routes
router.put('/:id', userController.updateUser);
router.post('/getUserIdByEmail', userController.getUserIdByEmail);

module.exports = router;