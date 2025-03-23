const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    name:{
        type: String ,
        required: true
    },
    email:{
        type: String ,
        required: true,
        unique: true
    },
    password:{
        type: String ,
        required: true,
    },
    confirmationCode: {type: String},

    isVerified: { type: Boolean, default: false },

    codeExpiresAt: {type: Date},

    sessionToken: { type: String, default: null },
    
},{timestamps:true});

const UserModel = mongoose.model('user',userSchema);
module.exports = UserModel;