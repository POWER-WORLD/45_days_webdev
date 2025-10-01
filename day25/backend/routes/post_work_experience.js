const express = require("express");
const { body, validationResult } = require('express-validator');
const router = express.Router();
const ExperienceModel = require("../models/work-experience");

// Route for posting work experience
router.post("/", [
    // Validation middleware
    body('company').trim().notEmpty().withMessage('Company name is required'),
    body('position').trim().notEmpty().withMessage('Position is required'),
    body('startDate').isISO8601().toDate().withMessage('Start date must be a valid date'),
    body('endDate').optional({ nullable: true }).isISO8601().toDate()
        .withMessage('End date must be a valid date'),
    body('location').optional().trim().isString().withMessage('Location must be a string'),
    body('isCurrent').isBoolean().withMessage('isCurrent must be a boolean'),
    body('description').optional().trim().isString().withMessage('Description must be a string'),
    body('achievements').optional().isArray().withMessage('Achievements must be an array of strings')
        .custom((value) => value.every(item => typeof item === 'string')),
    body('technologies').optional().isArray().withMessage('Technologies must be an array of strings')
        .custom((value) => value.every(item => typeof item === 'string')),
    body('companySize').optional().isInt({ min: 1 }).withMessage('Company size must be a positive integer'),
    body('industry').optional().trim().isString().withMessage('Industry must be a string'),
    body('website').optional().trim().isURL().withMessage('Website must be a valid URL')
], async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false,
                errors: errors.array() 
            });
        }

        // Create new experience instance
        const newExperience = new ExperienceModel({
            company: req.body.company,
            position: req.body.position,
            startDate: req.body.startDate,
            endDate: req.body.endDate || null,
            location: req.body.location,
            isCurrent: req.body.isCurrent,
            description: req.body.description,
            achievements: req.body.achievements || [],
            technologies: req.body.technologies || [],
            companySize: req.body.companySize,
            industry: req.body.industry,
            website: req.body.website,
        });

        // Save to database
        const savedExperience = await newExperience.save();

        // Send success response
        res.status(201).json({
            success: true,
            data: savedExperience 
        });

    } catch (error) {
        // Error handling
        console.error('Error saving work experience:', error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            message: error.message
        });
    }
});

module.exports = router;
