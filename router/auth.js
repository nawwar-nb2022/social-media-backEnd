import { Router } from "express";
import { loginPost, signPost } from "../controllers/authConttrolers.js";

const authRouter = Router()

authRouter.post("/sing",signPost)

authRouter.post("/login",loginPost)

export default authRouter