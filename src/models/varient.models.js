import mongoose, { Schema } from "mongoose";

const variantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  additional_cost: {
    type: Number,
    required: true,
  },
  stock_count: {
    type: Number,
    required: true,
  },
});

export const variant = mongoose.model("variant", variantSchema);
