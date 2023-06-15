import { Router } from "express";
import { deletePost, desLikePost, GetPost, likePost, postCreate, updatePost , ShowPost } from "../controllers/PostControllers.js";

const PostRouter = Router()

PostRouter.post("/create" , postCreate)
PostRouter.get("/" , GetPost)

PostRouter.put("/update/:id" , updatePost)
PostRouter.delete("/delete/:id" , deletePost)

PostRouter.put("/like/:id", likePost)
PostRouter.put("/desLike/:id", desLikePost)

PostRouter.get("/PostShowed" , ShowPost)

export default PostRouter