const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const emailController = require('../controller/Email');

// Validation middleware
const validateEmailInputs = [
    body('name').trim().notEmpty().withMessage('Name is required')
        .isLength({ max: 100 }).withMessage('Name too long'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required')
        .isLength({ max: 200 }).withMessage('Subject too long'),
    body('message').trim().notEmpty().withMessage('Message is required')
        .isLength({ max: 5000 }).withMessage('Message too long')
];

// Email route
router.post('/send', validateEmailInputs, emailController.sendEmail);

module.exports = router;