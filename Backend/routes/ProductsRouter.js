import { Router } from "express";
import { GetAllProducts, CreateVariousProducts, UpdateProduct, CreateProduct, DeleteProduct } from "../controllers/ProductController.js";
import { verifyUser } from "../middlewares/authentication.js";

const productsRouter = Router()

productsRouter.get('/', GetAllProducts)
productsRouter.put('/:id', verifyUser, UpdateProduct)
productsRouter.post('/', verifyUser, CreateProduct)
productsRouter.post('/create-products', verifyUser, CreateVariousProducts)
productsRouter.delete('/:id', verifyUser, DeleteProduct)

export default productsRouter;