import { CRUD } from "../../common/interfaces/crud.interface";
import debug from "debug";
import OrdersDao from "./orders.dao";
import UsersService from "../users/users.service";

const log: debug.IDebugger = debug("app:products-service");

class OrdersService implements CRUD {
  async createOrder(userId: string, products: []) {
    const user = await UsersService.getUserById(userId)
    const delivery = `${user?.address} ${user?.apartment || ''} ${user?.city} (${user?.postalCode})`
    let totalPrice = 0
    products.map((x:any) => totalPrice += x.productId.price )
    return OrdersDao.createOrder(userId, products, totalPrice, delivery);
  }

  async getOrders(userId: string) {
    return OrdersDao.getOrdersByUser(userId)
  }

  async getOrderById(orderId: string) {
    return OrdersDao.getOrderById(orderId)
  }

  async completeOrder(orderId: string) {
    let status = "Finalized"
    return OrdersDao.completeOrder( orderId, status )
  }
  
}

export default new OrdersService();
