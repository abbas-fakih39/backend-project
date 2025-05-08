const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    commentOwner:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    parentPost:{
        type: Schema.Types.ObjectId,
        ref: "Post",
    },
    content:{
        type:String,
        default:"",
        maxLength: 400,
    },
},
{ timestamps:true }
);

module.exports = mongoose.model("Comment", commentSchema);
