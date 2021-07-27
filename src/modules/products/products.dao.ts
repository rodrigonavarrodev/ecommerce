import mongooseService from "../../common/services/mongoose.service";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
import debug from "debug";

const log: debug.IDebugger = debug("app:products-dao");

export interface Product extends mongoose.Document {
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  images: any;
}

class ProductsDao {
  Schema = mongooseService.getMongoose().Schema;

  ProductsSchema = new this.Schema(
    {
      name: String,
      description: String,
      category: { type: Schema.Types.ObjectId, ref: "Categories" },
      price: Number,
      stock: Number,
      images: [{ type: Schema.Types.ObjectId, default: [], ref: "Images" }],
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
    return this.Product.find().populate('category')
  }

  async getById(id: string) {    
    return this.Product.findById(id).populate('category')
  }

  async create(productFields: ProductsModel.createProduct) {
    const product = new this.Product({...productFields})
    await product.save()
    return product
  }

  async getAllByCategory(categoryId: string) {
    console.log(categoryId);
    
    return this.Product.find({ category: categoryId })
  }

  async updateStock(productId: string, stock: number) {
    return this.Product.findOneAndUpdate(
      { _id: productId },
      { $set: { stock: stock} },
      { new: true })
  }

}

export default new ProductsDao();
