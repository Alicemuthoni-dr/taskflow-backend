const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    
    const user = await User.create({
      email,
      password,
      firstName,
      lastName
    });
    
    res.status(201).json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};