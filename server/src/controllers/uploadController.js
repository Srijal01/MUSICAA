const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

// Upload image to Cloudinary
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Create upload stream to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'ecommerce-products',
        resource_type: 'image',
        transformation: [
          { width: 800, height: 800, crop: 'limit' },
          { quality: 'auto' },
          { fetch_format: 'auto' }
        ]
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ message: 'Upload failed', error: error.message });
        }
        
        res.json({
          success: true,
          imageUrl: result.secure_url,
          cloudinaryId: result.public_id,
        });
      }
    );

    // Convert buffer to stream and upload
    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete image from Cloudinary
const deleteImage = async (req, res) => {
  try {
    const { cloudinaryId } = req.body;
    
    if (!cloudinaryId) {
      return res.status(400).json({ message: 'Cloudinary ID is required' });
    }

    const result = await cloudinary.uploader.destroy(cloudinaryId);
    
    if (result.result === 'ok') {
      res.json({ success: true, message: 'Image deleted successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Image deletion failed' });
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { uploadImage, deleteImage };
