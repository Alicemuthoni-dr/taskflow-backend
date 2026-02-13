// src/auth/auth.validation.js
const Joi = require('joi');

// Register validation schema
const registerSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .lowercase()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
    
  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters',
      'string.pattern.base': 'Password must contain uppercase, lowercase, number and special character',
      'any.required': 'Password is required'
    }),
    
  firstName: Joi.string()
    .trim()
    .max(50)
    .required()
    .messages({
      'any.required': 'First name is required'
    }),
    
  lastName: Joi.string()
    .trim()
    .max(50)
    .required()
    .messages({
      'any.required': 'Last name is required'
    })
});

// Login validation schema
const loginSchema = Joi.object({
  email: Joi.string().email().required().lowercase(),
  password: Joi.string().required()
});

// Validate function - middleware
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map(err => ({
        field: err.path[0],
        message: err.message
      }));
      
      return res.status(400).json({
        success: false,
        error: {
          type: 'ValidationError',
          message: 'Validation failed',
          details: errors
        }
      });
    }
    
    next();
  };
};

module.exports = {
  registerSchema,
  loginSchema,
  validate
};