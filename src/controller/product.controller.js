import { Product } from "../models/product.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { asynchandling } from "../utils/Asynchandler.js";

const addProduct = asynchandling(async (req, res) => {
  const { title, description, price } = req.body;
  console.log(req.body);
  if (!(title || description || price)) {
    throw new ApiError(401, "All fields Are required");
  }
  const data = await Product.find({
    $or: [{ title }, { description }],
  });
  if (data) {
    throw new ApiError(
      400,
      "product with same name and description alredy exists"
    );
  }
  // Create product
  const newProduct = await Product.create({
    title,
    description,
    price,
  });
  const finde = await Product.findById(newProduct?._id);

  if (!finde) {
    throw new ApiError(
      400,
      "something went wrong while adding the product please try again"
    );
  }
  return res
    .status(200)
    .json(new ApiResponse(200, finde, "product addedd successfully"));
});
//get product
const getProduct = asynchandling(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(401, "id is required");
  }
  const data = await Product.findById(id);
  if (!data) {
    throw new ApiError(400, "product not found");
  }

  return res.status(200).json(new ApiResponse(200, data, "product found"));
});

//update product
const updateProduct = asynchandling(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(401, "id is required");
  }
  const data = await Product.findById(id);
  if (!data) {
    throw new ApiError(400, "product not found");
  }
  const { title, description, price } = req.body;
  if (!(title || description || price)) {
    throw new ApiError(401, "All fields Are required");
  }
  const updated = await Product.findByIdAndUpdate(
    id,
    { title, description, price },
    { new: true }
  );
  if (!updated) {
    throw new ApiError(400, "something went wrong while updating the product");
  }
  return res.status(200).json(new ApiResponse(200, updated, "product updated"));
});

//delete product
const deleteProduct = asynchandling(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(401, "id is required");
  }
  const data = await Product.findById(id);
  if (!data) {
    throw new ApiError(400, "product not found");
  }
  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted) {
    throw new ApiError(400, "something went wrong while deleting the product");
  }
  return res.status(200).json(new ApiResponse(200, deleted, "product deleted"));
});

//get all products
const getAllProducts = asynchandling(async (req, res) => {
  const data = await Product.find();
  if (!data) {
    throw new ApiError(400, "no product found");
  }
  return res.status(200).json(new ApiResponse(200, data, "product found"));
});
export { addProduct, getProduct, deleteProduct, updateProduct, getAllProducts };
