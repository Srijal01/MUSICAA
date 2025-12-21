// Seed Users Script
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Test users data
const testUsers = [
  {
    name: 'Test User',
    email: 'testuser@ecommerce.com',
    password: 'testuser123',
    role: 'user',
  },
  {
    name: 'Admin User',
    email: 'admin@ecommerce.com',
    password: 'admin123',
    role: 'admin',
  },
];

const seedUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');

    // Clear existing test users (optional - remove if you don't want to delete existing users)
    const testEmails = testUsers.map(user => user.email);
    await User.deleteMany({ email: { $in: testEmails } });
    console.log('Cleared existing test users');

    // Hash passwords and create users
    const usersWithHashedPasswords = await Promise.all(
      testUsers.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return {
          ...user,
          password: hashedPassword,
        };
      })
    );

    // Insert users into database
    const createdUsers = await User.insertMany(usersWithHashedPasswords);
    
    console.log('\n✅ Test users created successfully!\n');
    console.log('📝 User Credentials:\n');
    
    testUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.role.toUpperCase()}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Password: ${user.password}`);
      console.log('');
    });

    // Close database connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

// Run the seed function
seedUsers();
