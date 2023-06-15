import { Router } from "express";
import { deleteUser, followUser, getUserInfo, unFollowUser, updateUser } from "../controllers/userConttroller.js";

const usersRouter = Router()

usersRouter.get("/" , (req , res)=>{
    res.send("test")
})

usersRouter.put("/update/:id" , updateUser) 
usersRouter.delete("/delete/:id" , deleteUser)
usersRouter.get("/:id" , getUserInfo)

usersRouter.post("/follow/:id" , followUser)
usersRouter.post("/unFollow/:id" , unFollowUser)
export default usersRouter