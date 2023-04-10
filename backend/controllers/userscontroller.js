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
    
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "This email is already registered." });
    }

    const newUser = new User({
      email,
      password: hashedPassword,
      type
    });
    console.log("user : " , newUser);
    await newUser.save({ timeout: 30000 });
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
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
        { userId: user._id, email: user.email,type:user.type },
        process.env.SECRET,
        { expiresIn: '1h' }
      );
  
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 3600000, // 1 hour in milliseconds
      });
  
      res.json({
        message: 'Authentication successful',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          type: user.type
        },
        token: token
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  exports.getUserByEmail = async (req, res) => {
    try {
      const email = req.params.email;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  }
  exports.authCheck = async (req, res, next) => {
    try {
      // Check if the request contains a token
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      // Verify the token
      const decodedToken = jwt.verify(token, process.env.SECRET);
      const userId = decodedToken.userId;
      
      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      console.log(token);
      console.log(user);
      console.log(decodedToken);
      // Attach the user object to the request
      req.user = user;
  
      next();
    } catch (err) {
      res.status(401).json({ message: 'Unauthorized' });
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