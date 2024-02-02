import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  variant: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "variant",
    },
  ],
});

export const Product = mongoose.model("Product", productSchema);
