import { Router } from "express";
import * as productsController from "../../controllers/v1/products-controller";

const router = Router();

router.get("", productsController.getProducts);
router.post("/create", productsController.createProduct);
router.put("/:productId", productsController.updateProduct);
router.delete("/:productId", productsController.deleteProductById);

export default router;
