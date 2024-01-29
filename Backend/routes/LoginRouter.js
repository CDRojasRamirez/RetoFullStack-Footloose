import { Router } from "express";
import { CreateLogin } from "../controllers/LoginController.js";

const loginRouter = Router()

loginRouter.post('/', CreateLogin)

export default loginRouter;