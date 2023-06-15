import { model } from "mongoose";
import { Schema } from "mongoose";

const postSchema = new Schema({
    userId : {
        type : String,
        require : true
    },
    desc :{ 
        type : String,
        max : 500
    },
    image : {
        type : String,
    },
    likes : {
        type : Array,
        default : []
    }
} , {timestamps : true})

const Post = model("post" , postSchema)

export default Post 