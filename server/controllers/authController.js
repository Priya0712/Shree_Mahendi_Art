const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Fail loudly if required env vars are missing
const REQUIRED_ENV = ['ADMIN_USERNAME', 'ADMIN_PASSWORD', 'JWT_SECRET'];
REQUIRED_ENV.forEach((key) => {
  if (!process.env[key]) {
    console.error(`\n❌ FATAL: Environment variable "${key}" is not set. Add it to server/.env and restart.\n`);
  }
});

// Seed or reset admin credentials from env on server start
exports.seedDefaultAdmin = async () => {
  try {
    const defaultUsername = (process.env.ADMIN_USERNAME || 'admin').trim();
    const defaultPassword = (process.env.ADMIN_PASSWORD || 'admin123').trim();

    // Wipe any existing stale admin docs and recreate fresh admin account
    await Admin.deleteMany({});
    
    const newAdmin = new Admin({ username: defaultUsername, password: defaultPassword });
    await newAdmin.save();

    console.log('--------------------------------------------------');
    console.log('✅ Fresh Admin account ready from environment settings');
    console.log(`   Username: ${defaultUsername}`);
    console.log('--------------------------------------------------');
  } catch (error) {
    console.error('Failed to seed default admin:', error.message);
  }
};

exports.login = async (req, res) => {
  let { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    username = username.trim();
    password = password.trim();

    // Case-insensitive username lookup
    const admin = await Admin.findOne({
      username: { $regex: new RegExp(`^${username}$`, 'i') }
    });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials — user not found' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials — password mismatch' });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'Server misconfiguration: JWT_SECRET not set' });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      status: 'success',
      token,
      admin: { id: admin._id, username: admin.username }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};

exports.updateCredentials = async (req, res) => {
  const { username, password } = req.body;
  const adminId = req.admin.id;

  try {
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    admin.username = username.trim();
    admin.password = password.trim();
    await admin.save();

    res.json({
      status: 'success',
      message: 'Credentials updated successfully',
      admin: { id: admin._id, username: admin.username }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error updating credentials', error: error.message });
  }
};
