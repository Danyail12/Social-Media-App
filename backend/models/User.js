const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    avatar:{
        public_id:String,
        url:String
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: [true, "Email already exists"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false,
    },
    post:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
    }],
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }]
})
userSchema.pre("save", async function (next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
})
userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}
userSchema.methods.generateAuthToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET);
}
module.exports = mongoose.model("User", userSchema);