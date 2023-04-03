const User = require('../module/users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie')
// User registration
exports.register = async (req, res) => {
    try {
      const { email, password, type } = req.body;
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = new User({
        email,
        password: hashedPassword,
        type
      });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  // User login
  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
  
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.SECRET,
        { expiresIn: '1h' }
      );
  
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 3600000, // 1 hour in milliseconds
      });
  
      res.json({ message: 'Authentication successful' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  exports.logout = async (req, res) => {
    try {
      res.clearCookie('token'); // Clear the authentication token from the cookies
      res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };