const user =require("../models/User");
const jwt = require("jsonwebtoken");


exports.isAuthenticated = async (req, res, next) => {
    try {
        const{token} = req.cookies;
    if(!token){
        return res.status(401).json({
            message: "please login first",
        })

    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await user.findById(decoded.id);
    next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}