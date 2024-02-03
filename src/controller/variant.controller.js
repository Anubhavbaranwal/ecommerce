import { Product } from "../models/product.models.js";
import { variant } from "../models/varient.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { asynchandling } from "../utils/Asynchandler.js";

const addVariant = asynchandling(async (req, res) => {
  const { productId } = req.params;
  const { name, sku, additional_cost, stock_count } = req.body;
  if (!(name && sku && additional_cost && stock_count)) {
    throw new ApiError(401, "All fields are required");
  }
  const product = await Product.findById(productId);
  if (!product) throw new ApiError(400, "Product not found");

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

const getVariant = asynchandling(async (req, res) => {
  const { id } = req.params;
  const variantData = await variant.findById(id);
  if (!variantData) throw new ApiError(400, "Variant not found");

  res.status(200).json(new ApiResponse(200, variantData, "Variant found"));
});

const deleteVariant = asynchandling(async (req, res) => {
  const { id } = req.params;
  const { productId } = req.params;

  const product = await Product.findById(productId);
  if (!product) throw new ApiError(400, "Product not found");
  const variantIndex = product.variant.indexOf(id);
  if (variantIndex === -1)
    throw new ApiError(400, "Variant not found in product");

  if (variantIndex !== -1) {
    product.variant.splice(variantIndex, 1);
    await product.save();
    console.log(product.variant);
  }
  const deletedVariant = await variant.findByIdAndDelete(id);
  if (!deletedVariant)
    throw new ApiError(400, "Something went wrong while deleting the variant");

  res.status(200).json(new ApiResponse(200, deletedVariant, "Variant deleted"));
});

const updateVariant = asynchandling(async (req, res) => {
  const { id } = req.params;
  const { name, sku, additional_cost, stock_count } = req.body;
  console.log(req.body);
  if (!name && !sku && !additional_cost && !stock_count) {
    throw new ApiError(401, "minimum one field input is required");
  }
  let update = {};
  if (name) update.name = name;
  if (sku) update.sku = sku;
  if (additional_cost) update.additional_cost = additional_cost;
  if (stock_count) update.stock_count = stock_count;
  const updatedVariant = await variant.findByIdAndUpdate(id, update, {
    new: true,
  });
  if (!updatedVariant)
    throw new ApiError(400, "Something went wrong while updating the variant");

  res
    .status(200)
    .json(new ApiResponse(200, updatedVariant, "Variant updated successfully"));
});

export { addVariant, getVariant, deleteVariant, updateVariant };
