import { Router } from "express";
import * as productsController from "../../controllers/v1/products-controller";
import { checkAuth } from "../../middlewares/auth-middleware";

const router = Router();

router.get("", checkAuth, productsController.getProducts);
router.post("/create", checkAuth, productsController.createProduct);
router.put("/:productId", checkAuth, productsController.updateProduct);
router.delete("/:productId", checkAuth, productsController.deleteProductById);

export default router;
