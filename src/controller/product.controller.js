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

export { addProduct };
