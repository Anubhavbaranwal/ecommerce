import { Router } from "express";
import {
  addProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
} from "../controller/product.controller.js";
import {
  addVariant,
  deleteVariant,
  getVariant,
  updateVariant,
} from "../controller/variant.controller.js";
import { searchProducts } from "../controller/search.controller.js";

const router = Router();

router.route("/add").post(addProduct);
router.route("/").get(getAllProducts);
router.route("/search").get(searchProducts);
router.route("/:id").get(getProduct).delete(deleteProduct).put(updateProduct);
router.route("/:productId/varaint").post(addVariant);
router
  .route("/:productId/variant/:id")
  .get(getVariant)
  .delete(deleteVariant)
  .put(updateVariant);

export default router;
