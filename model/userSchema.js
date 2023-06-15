import { model, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
const userSchema = new Schema({
    userName : {
        type : String,
        require : [true , "please enter your name"],
        unique : true ,
        min : [3 , "your name should be more than 3 characters"],
        max : [8 , "your name should be less than 8 characters"]
    },
    email : { 
        type : String,
        require : [true , "please enter your email"],
        validate : [validator.isEmail , "please enter a valid email" ],
        unique : true 
    },
    password : {
        type : String ,
        require : [true , "please enter your password"],
        min : [6 , "your password should be more than 6 characters"]
    },
    profileImage : {
        type : String ,
        default : ""
    },
    coverPicture : {
        type : String ,
        default : ""
    },
    followers : {
        type: Array ,
        default : []
    },
    following:{
        type : Array ,
        default : []
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    desc : {
        type : String,
        default : "",
        max : 50
    },
    city :{
        type:String,
        default : "",
        max:50
    },
    from : {
        type : String,
        default : "",
        max: 50
    },
    relationShape :{
        type : Number ,
        default : "",
        enum : [1 , 2 , 3]
    }
},
    {timestamps: true})


userSchema.pre("save" , async function (next){
    const salt  = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password , salt);
    next();
})

const userInformation = model("User_information" , userSchema) 

export default userInformation