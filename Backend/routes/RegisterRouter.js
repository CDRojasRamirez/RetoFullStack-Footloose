import { Router } from "express";
import { CreateRegister, getRegister } from "../controllers/RegisterController.js";

const registerRouter = Router()

registerRouter.post('/', CreateRegister)
registerRouter.get('/', getRegister)

export default registerRouter;