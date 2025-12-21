// Payment Helper Functions
const crypto = require('crypto');

// Generate HMAC SHA256 hash for eSewa
const generateHmacSha256Hash = (data, secretKey) => {
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(data);
  return hmac.digest('base64');
};

module.exports = { generateHmacSha256Hash };
