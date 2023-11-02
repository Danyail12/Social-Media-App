const express = require("express");
const { register,login } = require("../controllers/user"); // Import the correct function name

const router = express.Router();

// Use the correct route path: "/registers" instead of "registers"
router.route("/register").post(register); // Use the correct function name: "register" instead of "registers"
router.route("/login").post(login); // Use the correct function name: "register" instead of "registers
module.exports = router;
