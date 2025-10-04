const { body, validationResult } = require("express-validator");

const validateSkill = [
  body("name").notEmpty().withMessage("Skill name is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("proficiency").isIn(["Beginner", "Intermediate", "Advanced", "Expert"]).withMessage("Invalid proficiency value"),
  body("yearsOfExperience").optional().isInt({ min: 0 }).withMessage("Years of experience must be a non-negative integer"),
  body("description").optional({ nullable: true }).isString().withMessage("Description must be a string"),
  body("icon").optional({ nullable: true }).isString().withMessage("Icon must be a string"),
  body("color").optional({ nullable: true }).isString().withMessage("Color must be a string"),

  // Handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateSkill;
