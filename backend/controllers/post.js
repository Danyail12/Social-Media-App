const Post = require("../models/Post");
const User = require("../models/User");

exports.createPost = async (req, res) => {
    try {

        const newPostData = {

            caption: req.body.caption,
            image: {
                public_id: "req.body.image.public_id",
                url: "req.body.image.url"
            },
            onwner: req.user._id,

        };
        const post = await Post.create(newPostData);
        
        const user = await User.findById(req.user._id);
        
        user.post.push(post._id);

        await user.save();
        res.status(201).json({
            success: true,
            post,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "nhi thek bai",
        })
    }
}

exports.likeAndUnlikePost = async (req, res) => {
    try {
        
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "like button is not working",
        })
    }
}
