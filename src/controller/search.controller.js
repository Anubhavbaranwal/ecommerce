import { Product } from "../models/product.models.js";
import { asynchandling } from "../utils/Asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { variant } from "../models/varient.models.js";

const searchProducts = asynchandling(async (req, res) => {
  const { query } = req.query;

  const variants = await variant.find({ name: new RegExp(query, "i") });
  const variantIds = variants.map((variant) => variant._id);

  const products = await Product.find({
    $or: [
      { title: new RegExp(query, "i") },
      { description: new RegExp(query, "i") },
      { variant: { $in: variantIds } },
    ],
  });

  //   console.log(matchedProducts);
  if (!(products.length > 0)) {
    throw new ApiError(404, "No products found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products retrieved successfully"));
});

export { searchProducts };
