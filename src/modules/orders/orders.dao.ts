import mongooseService from "../../common/services/mongoose.service";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
import debug from "debug";

const log: debug.IDebugger = debug("app:orders-dao");

export interface Order extends mongoose.Document {
  userId: string;
  products: [{ productId: string; quantity: number; price: number }];
  status: string;
  total: number;
}

class OrdersDao {
  Schema = mongooseService.getMongoose().Schema;

  OrdersSchema = new this.Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: "Users" },
      products: [
        {
          productId: { type: Schema.Types.ObjectId, ref: "Products" },
          quantity: Number,
          price: Number,
        },
      ],
      status: {
        type: String,
        enum: ["Generated", "Finalized", /* "On the way", "Paid" */ ],
        default: "Generated",
      },
      total: Number,
    },

    { timestamps: true }
  );

  Order = mongooseService
    .getMongoose()
    .model<Order>("Orders", this.OrdersSchema);

  constructor() {
    log("Created new instance of StatesDao");
  }

  async createOrder(userId: string, products: [], totalPrice: number) {
    const order = new this.Order({ userId: userId, products: products, total: totalPrice });
    await order.save();
    return order;
  }
}

export default new OrdersDao();
