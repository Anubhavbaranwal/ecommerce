import { variant } from "../models/varient.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { asynchandling } from "../utils/Asynchandler.js";

//add varient
const addVariant = asynchandling(async (req, res) => {
  const { name, sku, additional_cost, stock_count } = req.body;
  if (!(name || sku || additional_cost || stock_count)) {
    throw new ApiError(401, "All fields Are required");
  }
  const data = await variant.find({
    $or: [{ name }, { sku }],
  });
  if (data) {
    throw new ApiError(400, "variant with same name and sku alredy exists");
  }
  // Create variant
  const newVariant = await variant.create({
    name,
    sku,
    additional_cost,
    stock_count,
  });
  const finde = await variant.findById(newVariant?._id);

  if (!finde) {
    throw new ApiError(
      400,
      "something went wrong while adding the variant please try again"
    );
  }
  return res
    .status(200)
    .json(new ApiResponse(200, finde, "variant addedd successfully"));
});
//get varient
const getVariant = asynchandling(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(401, "id is required");
  }
  const data = await variant.findById(id);
  if (!data) {
    throw new ApiError(400, "variant not found");
  }
  return res.status(200).json(new ApiResponse(200, data, "variant found"));
});
//delete varient
const deleteVariant = asynchandling(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(401, "id is required");
  }
  const data = await variant.findById(id);
  if (!data) {
    throw new ApiError(400, "variant not found");
  }
  const deleted = await variant.findByIdAndDelete(id);
  if (!deleted) {
    throw new ApiError(400, "something went wrong while deleting the variant");
  }
  return res.status(200).json(new ApiResponse(200, deleted, "variant deleted"));
});
