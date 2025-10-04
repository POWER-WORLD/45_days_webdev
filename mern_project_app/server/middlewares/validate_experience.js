// middleware/validateExperience.js
const { body, validationResult } = require("express-validator");

const validateExperience = [
    body("company").notEmpty().withMessage("Company name is required"),
    body("position").notEmpty().withMessage("Position is required"),
    body("startDate").isISO8601().withMessage("Start date must be a valid date"),
    body("endDate").optional({ nullable: true }).isISO8601().withMessage("End date must be a valid date"),
    body("description").notEmpty().withMessage("Description is required"),
    body("technologies").isArray({ min: 1 }).withMessage("At least one technology is required"),
    body("employmentType").isIn(["Full-time", "Part-time", "Internship", "Contract", "Freelance"]).withMessage("Invalid employment type"),

    // Final middleware to catch errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = validateExperience;
