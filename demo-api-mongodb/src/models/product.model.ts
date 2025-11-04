import { Document, model, models, Schema } from "mongoose";

export interface IProduct {
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IBaseResponse {
  success: boolean;
  message: string;
  timestamp: string;
}

export interface ISuccessResponse extends IBaseResponse {
  data: IProduct | IProduct[] | null;
  status: number;
  total?: number;
}

export interface IErrorResponse extends IBaseResponse {
  error: string;
  status: number;
}

export interface IProductDocument extends IProduct, Document {
  id: string | Number; //virtual
}

const ProductSchema = new Schema<IProductDocument>(
  {
    name: {
      type: String,
      required: [true, "Product name is required. 📛"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters."],
    },
    description: {
      type: String,
      required: [true, "Product description is required. 📝"],
      maxlength: [500, "Description cannot exceed 500 characters."],
    },
    price: {
      type: Number,
      required: [true, "Product price is required. 💰"],
      min: [0, "Price must be non-negative."],
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required. 📦"],
      min: [0, "Stock cannot be negative."],
      default: 0,
    },
    imageUrl: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const Product =models.Product || model<IProductDocument>("Product", ProductSchema);
