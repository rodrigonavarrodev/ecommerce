import mongooseService from "../../common/services/mongoose.service";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
import debug from "debug";

const log: debug.IDebugger = debug("app:carts-dao");

export interface Cart extends mongoose.Document {
  userId: string;
  products: [{ productId: string, quantity: number }];
}

class CartsDao {
  Schema = mongooseService.getMongoose().Schema;

  CartsSchema = new this.Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: "Users" },
      products: [
        { productId: { type: Schema.Types.ObjectId, ref: "Products"}, quantity: Number  }
      ],  
    },
    { timestamps: true }
  );

  Cart = mongooseService.getMongoose().model<Cart>("Carts", this.CartsSchema);

  constructor() {
    log("Created new instance of StatesDao");
  }

  async getCart(userId: string) {
    return this.Cart.findOne({ userId }).populate({
      path: "products",
      populate: {
        path: "productId", select: "name description price"
      },
    });;
  }

  async createCart(userId: string) {
    const cart = new this.Cart({ userId: userId, products: [] });
    await cart.save();
    return cart;
  }

  async addProducts(userId: string, products: any) {   
     
    const cart = await this.Cart.findOneAndUpdate(
      { userId: userId },
      { $set: { products: products} },
      { new: true }
    )
    return cart;
  }
}

export default new CartsDao();
