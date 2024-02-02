import { Router } from "express";
import {
  addProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
} from "../controller/product.controller.js";

const router = Router();

router.route("/add").post(addProduct);
router.route("/").get(getAllProducts);
router.route("/:id").get(getProduct).delete(deleteProduct).put(updateProduct);

export default router;
