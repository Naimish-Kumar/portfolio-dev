const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  if (!usernameOrEmail || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email/username and password' });
  }

  try {
    const [admins] = await pool.query(
      'SELECT * FROM admins WHERE email = ? OR username = ? LIMIT 1',
      [usernameOrEmail, usernameOrEmail]
    );

    if (admins.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const admin = admins[0];
    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username, email: admin.email },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: 'Logged in successfully',
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.getMe = async (req, res) => {
  try {
    const [admins] = await pool.query(
      'SELECT id, username, email, created_at FROM admins WHERE id = ?',
      [req.admin.id]
    );
    if (admins.length === 0) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }
    return res.json({ success: true, admin: admins[0] });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ success: false, message: 'Please provide current and new password' });
  }

  try {
    const [admins] = await pool.query('SELECT * FROM admins WHERE id = ?', [req.admin.id]);
    if (admins.length === 0) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    const admin = admins[0];
    const isMatch = await bcrypt.compare(currentPassword, admin.password_hash);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE admins SET password_hash = ? WHERE id = ?', [newHash, req.admin.id]);

    return res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error('Password change error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
