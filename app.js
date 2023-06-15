import express from "express"
import mongoose from "mongoose"
import helmet from "helmet"
import morgan from "morgan"
import {config} from "dotenv"

import usersRouter from "./router/users.js"
import authRouter from "./router/auth.js"
import PostRouter from "./router/Post.js"
config()
const app = express()

mongoose
    .connect(process.env.mongoose_connect)
    .then(res=>app.listen(3000))
    .catch(err=>{console.log(err)})

/*

because we are doing a rest api project we will not need to use this

app.set("view engin" , "ejs")

app.use(express.static("public"))

app.use(express.urlencoded())

*/
app.use(express.json())

// new package use __ helmet -- morgan
app.use(helmet())

app.use(morgan('common'))


// router section
app.use("/api/user" , usersRouter)
app.use("/api/auth" , authRouter )
app.use("/api/post" , PostRouter )