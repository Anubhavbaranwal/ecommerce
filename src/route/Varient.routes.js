import { Router } from "express";
import {
  addVarient,
  getVarient,
  deleteVarient,
  updateVarient,
  getAllVarients,
} from "../controller/varient.controller.js";

const router = Router(); // create a new router

router.route("/add").post(addVarient); // add a new varient
router.route("/").get(getAllVarients); // get all varients
router.route("/:id").get(getVarient).delete(deleteVarient).put(updateVarient); // get, delete and update varient

export { router };
