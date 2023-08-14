//middleware/register.js
const { check } = require("express-validator");

const registerValidation = [
  check("email").isEmail().withMessage("Email must be a valid email address"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[^a-zA-Z0-9]/)
    .withMessage("Password must contain at least one special character"),
  check("fullname").notEmpty().withMessage("Full name is required"),
  check("birthdate").isDate().withMessage("Birthdate must be a valid date"),
  check("joinDate").isDate().withMessage("Join date must be a valid date"),
  check("address").notEmpty().withMessage("Address is required"),
  check("phoneNumber")
    .isMobilePhone()
    .withMessage("Phone number must be a valid mobile phone number"),
  check("salaryAmount")
    .isInt({ min: 0 })
    .withMessage("Salary must be a non-negative integer"),
  check("status").isBoolean().withMessage("Status must be a boolean value"),
  check("roleId")
    .isInt({ min: 1 })
    .withMessage("Role ID must be a positive integer"),
];

module.exports = {
  registerValidation,
};
