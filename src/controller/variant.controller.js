import { Product } from "../models/product.models.js";
import { variant } from "../models/variant.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { asyncHandling } from "../utils/Asynchandler.js";

const validateVariantData = (name, sku, additional_cost, stock_count) => {
  if (!(name && sku && additional_cost && stock_count)) {
    throw new ApiError(401, "All fields are required");
  }
};

const addVariant = asyncHandling(async (req, res) => {
  const { productId } = req.params;
  const { name, sku, additional_cost, stock_count } = req.body;
  const product = await Product.findById(productId);
  if (!product) throw new ApiError(400, "Product not found");

  validateVariantData(name, sku, additional_cost, stock_count);

  const existingVariant = await variant.findOne({ $or: [{ name }, { sku }] });
  if (existingVariant)
    throw new ApiError(400, "Variant with same name or SKU already exists");

  const newVariant = await variant.create({
    name,
    sku,
    additional_cost,
    stock_count,
  });
  product.variant.push(newVariant._id);
  await product.save();

  res
    .status(200)
    .json(new ApiResponse(200, newVariant, "Variant added successfully"));
});

const getVariant = asyncHandling(async (req, res) => {
  const { id } = req.params;
  const variantData = await variant.findById(id);
  if (!variantData) throw new ApiError(400, "Variant not found");

  res.status(200).json(new ApiResponse(200, variantData, "Variant found"));
});

const deleteVariant = asyncHandling(async (req, res) => {
  const { id } = req.params;
  const deletedVariant = await variant.findByIdAndDelete(id);
  if (!deletedVariant)
    throw new ApiError(400, "Something went wrong while deleting the variant");

  res.status(200).json(new ApiResponse(200, deletedVariant, "Variant deleted"));
});

const updateVariant = asyncHandling(async (req, res) => {
  const { id, name, sku, additional_cost, stock_count } = req.body;
  validateVariantData(name, sku, additional_cost, stock_count);

  const updatedVariant = await variant.findByIdAndUpdate(
    id,
    { name, sku, additional_cost, stock_count },
    { new: true }
  );
  if (!updatedVariant)
    throw new ApiError(400, "Something went wrong while updating the variant");

  res
    .status(200)
    .json(new ApiResponse(200, updatedVariant, "Variant updated successfully"));
});

export { addVariant, getVariant, deleteVariant, updateVariant };
