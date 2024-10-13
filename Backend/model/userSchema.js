import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
});


const User = mongoose.model('users', userSchema);
export default User;