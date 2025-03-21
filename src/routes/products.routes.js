import { Router } from "express";
import { productController } from "../controllers/products.controllers.js";
import { roleAuth } from "../middlewares/roleAuth.js";


const productRouter = Router();

productRouter.get("/", roleAuth("admin"), productController.createProduct);

productRouter.get("/:pid", roleAuth("admin"), productController.getProduct);

productRouter.post("/", roleAuth("admin"), productController.getProducts);

productRouter.put("/:pid", roleAuth("admin"), productController.updateProduct);

productRouter.delete("/:pid", roleAuth("admin"), productController.deleteProduct);

export default productRouter