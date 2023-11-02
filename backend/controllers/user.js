// Assuming you have already imported necessary modules and set up your express app.

// Import the User model
const User = require("../models/User");

// Controller function for user registration
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Create a new user
        const user = await User.create({
            name,
            email,
            password,
            avatar: { public_id: "sample_id", url: "sampleurl" }, // Note the corrected "avatar" spelling
        });

        // Save the user to the database
        // const savedUser = await user.save();

        // res.status(201).json({
        //     success: true,
        //     user: savedUser,
        // });
        const token = await user.generateAuthToken();
        const options =
        {
            expires: new Date(Date.now() + 8640000000),
            httpOnly: true,
        }

        res.status(201).cookie("token", token, options).json({
            success: true,
            user,
            token
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }
        const token = await user.generateAuthToken();
        const options =
        {
            expires: new Date(Date.now() + 8640000000),
            httpOnly: true,
        }

        res.status(200).cookie("token", token, options).json({
            success: true,
            user,
            token
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}