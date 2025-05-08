const Post = require("../models/postSchema");
const User = require("../models/userSchema");

exports.createPost = async(req,res) => {
    try{
        const postOwner = await User.findById(req.body["postOwner"]);
        if(!postOwner){
            return res.status(401).json({message:"Please login to create a new post"})
        }

        const newPost = await Post.create({
            postOwner: req.body["postOwner"],
            img: req.body["img"],
            caption: req.body["caption"],
            content: req.body["content"],
        });

        return res.status(201).json({data : newPost, message: "Post created succesfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
};

exports.deletePost = async(req,res) => {
    try{
        const userTryingToDelete = await User.findById(req.body["postOwner"]);
        if(!userTryingToDelete){
            return res.status(404).json({message: "User trying to delete the post is not found"});
        }
        const post = await Post.findById(req.params["postID"]);
        if(!post){
            return res.status(404).json({message: "Post is not found"});
        }
        if(userTryingToDelete._id.toString() !== post.postOwner.toString()){
            return res.status(400).json({message: "User is not allowed to delete a post that is not owned by them"});
        }
        await post.deleteOne();

        return res.status(200).json({message: "Post deleted succesfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
}