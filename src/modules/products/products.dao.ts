import mongooseService from "../../common/services/mongoose.service";
import mongoose from "mongoose";
import debug from "debug";

const log: debug.IDebugger = debug("app:products-dao");

export interface Product extends mongoose.Document {
  name: string;
  description: string;
  code: string;
  picture: string;
  price: number;
  stock: number;
}

class ProductsDao {
  Schema = mongooseService.getMongoose().Schema;

  ProductsSchema = new this.Schema(
    {
      name: String,
      description: String,
      code: String,
      picture: String,
      price: Number,
      stock: Number,
    },
    { timestamps: true }
  );

  Product = mongooseService
    .getMongoose()
    .model<Product>("Products", this.ProductsSchema);

  constructor() {
    log("Created new instance of StatesDao");
  }

  async getAll() {
    return this.Product.find().exec();
  }
}

export default new ProductsDao();
