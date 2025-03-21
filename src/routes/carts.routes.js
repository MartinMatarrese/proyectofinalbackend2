import { Router } from "express";
import { CartControllers } from "../controllers/carts.controllers.js"
import { roleAuth } from "../middlewares/roleAuth.js";

const cartRouter = Router();

const cartControllers = new CartControllers();

cartRouter.get("/:cid", roleAuth("user"), cartControllers.getCart);

cartRouter.post("/", roleAuth("user"), cartControllers.createCart);

cartRouter.post("/:cid/products/:pid", roleAuth("user"), cartControllers.insiderProductCart);

cartRouter.put("/:cid", roleAuth("user"), cartControllers.updateProductsCart);

cartRouter.post("/:cid/products/:pid", roleAuth("user"), cartControllers.updateQuantityProductCart);

cartRouter.delete("/:cid", roleAuth("user"), cartControllers.deleteCart);

cartRouter.delete("/:cid/products/:pid", roleAuth("user"), cartControllers.deleteProductCart);

cartRouter

export default cartRouter