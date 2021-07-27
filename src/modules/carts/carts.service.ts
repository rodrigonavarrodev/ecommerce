import { CRUD } from "../../common/interfaces/crud.interface";
import debug from "debug";
import CartsDao from "./carts.dao";

const log: debug.IDebugger = debug("app:products-service");

class CartsService implements CRUD {
  async getCart(userId: string) {
    return CartsDao.getCart(userId);
  }

  async createCart(userId: string) {
    return CartsDao.createCart(userId)
  }

  async addProducts(userId: string, resource: any) {
    const cart = await CartsDao.getCart(userId);
    let products: any = cart?.products
    
    for (let i = 0; i < resource.products.length; i++) {     
      products.push(resource.products[i]);
    }
    return CartsDao.addProducts(userId, products)
  }
  
}

export default new CartsService();
