const mongoose= require ('mongoose');
const { type } = require('node:os');
const { boolean } = require('webidl-conversions');
const bcrypt=require('bcrypt');
//define person schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    email:{
        type:String
    },
    mobile:{
        type: String
    
    },
    address:{
        type:String,
        required:true,
    },
    addharcardNumber:{
        type:Number,
        required:true,
        Unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['voter','admin'],
        default:'voter'
    },
    isVoted:{
        type:Boolean,
        default:false
    }
})

userSchema.pre('save',async function(next){
        const person=this;
        //hash the password only if it is modified or new
        if(!person.isModified('password')) return;
        try{
         const salt=await bcrypt.genSalt(10);   
         //hash password
         const hasedPassword=await bcrypt.hash(person.password,salt);
         //override the plain password with hashed one
         person.password=hasedPassword;
        }catch(err){
            next(err);
        }
    })
    userSchema.methods.comparePassword=async function(candidatePassword){
        try{
            //use bcrypt to compare the provided password with the hashed password
            const isMatch=await bcrypt.compare(candidatePassword,this.password);
            return isMatch;
        }catch(err){
            throw err;
    }
}

//create person model
const User=mongoose.model('User',userSchema);
module.exports=User;