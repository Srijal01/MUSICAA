const express = require('express');
const { uploadImage, deleteImage } = require('../controllers/uploadController');
const upload = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

// Upload image (admin only)
router.post('/image', authMiddleware, adminMiddleware, upload.single('image'), uploadImage);

// Delete image (admin only)
router.delete('/image', authMiddleware, adminMiddleware, deleteImage);

module.exports = router;
