const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true,
        min : 11
    },
    work : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
        minlength : 4
    },
    cpassword : {
        type : String,
        required : true,
        minlength : 4
    },
    date:{
        type:Date,
        default: Date.now
    },
    messages:[
        {
            name : {
                type : String,
                required : true
            },
            email : {
                type : String,
                required : true
            },
            phone : {
                type : Number,
                required : true,
                min : 11
            },
            message : {
                type : String,
                required : true,
            },
        }
    ],
    tokens: [
        {
            token:{
                type : String,
                required : true
            }
        }
    ]
});

// hashing the password
userSchema.pre('save' , async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password , 12);
        this.cpassword = await bcrypt.hash(this.cpassword , 12);
    }
    next();
});

// generateAuth Token

userSchema.methods.generateAuthToken = async function() {
    try {
        let token = jwt.sign({_id:this._id} , process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (err) {
        console.log(err)
    }
}

// Store Message
userSchema.methods.addMessage = async function(name , email , phone , message){
    try {
        this.messages = this.messages.concat({name , email , phone , message});
        await this.save();
        return this.message;
    } catch (err) {
        console.log(err)
    }
}

// create collection
const User = mongoose.model("User",userSchema);

module.exports = User;