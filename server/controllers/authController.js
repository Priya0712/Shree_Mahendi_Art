const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Fail loudly if required env vars are missing
const REQUIRED_ENV = ['ADMIN_USERNAME', 'ADMIN_PASSWORD', 'JWT_SECRET'];
REQUIRED_ENV.forEach((key) => {
  if (!process.env[key]) {
    console.error(`\n❌ FATAL: Environment variable "${key}" is not set. Add it to server/.env and restart.\n`);
  }
});

// Seed or sync admin credentials from env on server start
exports.seedDefaultAdmin = async () => {
  try {
    const defaultUsername = process.env.ADMIN_USERNAME;
    const defaultPassword = process.env.ADMIN_PASSWORD;

    if (!defaultUsername || !defaultPassword) {
      console.error('❌ Cannot seed/sync admin: ADMIN_USERNAME or ADMIN_PASSWORD is not set in environment');
      return;
    }

    let admin = await Admin.findOne();
    if (!admin) {
      admin = new Admin({ username: defaultUsername, password: defaultPassword });
      await admin.save();
      console.log('--------------------------------------------------');
      console.log('✅ Default admin account created from environment');
      console.log(`   Username: ${defaultUsername}`);
      console.log('--------------------------------------------------');
    } else {
      // Sync credentials with env if changed
      let modified = false;
      if (admin.username !== defaultUsername) {
        admin.username = defaultUsername;
        modified = true;
      }
      const isPassMatch = await admin.comparePassword(defaultPassword);
      if (!isPassMatch) {
        admin.password = defaultPassword; // Pre-save hook will hash it
        modified = true;
      }
      if (modified) {
        await admin.save();
        console.log('--------------------------------------------------');
        console.log('🔄 Admin credentials updated to match environment');
        console.log(`   Username: ${defaultUsername}`);
        console.log('--------------------------------------------------');
      }
    }
  } catch (error) {
    console.error('Failed to seed/sync admin:', error.message);
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

    admin.username = username;
    admin.password = password;
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

