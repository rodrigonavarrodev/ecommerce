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
    products.push(resource)
    return CartsDao.addProducts(userId, products)
  }

  async removeProducts(userId: string, resource: any) {
    const cart = await CartsDao.getCart(userId);
    let products: any = cart?.products
    const found = products.find((element: any) => element._id == resource._id);
    if ( found.quantity - resource.quantity == 0 ) {
      let index = products.indexOf(found);
      products.splice(index, 1)    
    }
    found.quantity = found.quantity - resource.quantity
    
    console.log(products);
    
    return CartsDao.addProducts(userId, products)
  }

  async emptyCart(userId: string) {
    const cart = await CartsDao.getCart(userId);
    let products: any = cart?.products
    products = new Array()
    return CartsDao.addProducts(userId, products)

  }
  
}

export default new CartsService();
