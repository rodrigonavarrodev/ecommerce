import { CRUD } from "../../common/interfaces/crud.interface";
import debug from "debug";
import OrdersDao from "./orders.dao";

const log: debug.IDebugger = debug("app:products-service");

class OrdersService implements CRUD {
  async createOrder(userId: string, products: []) {
    let totalPrice = 0
    products.map((x:any) => totalPrice += x.productId.price )
    return OrdersDao.createOrder(userId, products, totalPrice);
  }
  
}

export default new OrdersService();
