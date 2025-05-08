const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"],
        trim: true,
        minLength: 3,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"],
        trim: true,
        minLength: 3,
        maxLength: 50,
    },
    username: {
        type: String,
        unique: true,
        required: [true, "Username is required"],
        trim: true,
        maxLength: 20,
        minLength: 3,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        trim: true,
        maxLength: 150,
        lowercase: true,
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: [true, "Phone Number is required"],
        trim: true,
        maxLength: 20,
    },
    profilePicture:{
        type: String,
        default:"",
    },
    friends:[
    {
        type: Schema.Types.ObjectId,
        ref:"User",
    },
],
followers: [
    {
        type: Schema.Types.ObjectId,
        ref:"User",
    }
],
following: [
    {
        type: Schema.Types.ObjectId,
        ref:"User",
    }
],
},
{ timestamps:true }
);

module.exports = mongoose.model("User", userSchema);
