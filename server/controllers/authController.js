const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Seed default admin if none exists
exports.seedDefaultAdmin = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const defaultUsername = 'admin';
      const defaultPassword = 'adminpassword123';
      
      const newAdmin = new Admin({
        username: defaultUsername,
        password: defaultPassword
      });
      await newAdmin.save();
      console.log('--------------------------------------------------');
      console.log('Seeded default admin account:');
      console.log(`Username: ${defaultUsername}`);
      console.log(`Password: ${defaultPassword}`);
      console.log('Please change this password in production!');
      console.log('--------------------------------------------------');
    }
  } catch (error) {
    console.error('Failed to seed default admin:', error.message);
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET || 'super_secret_shree_mahendi_key_12345',
      { expiresIn: '30d' }
    );

    res.json({
      status: 'success',
      token,
      admin: {
        id: admin._id,
        username: admin.username
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};
