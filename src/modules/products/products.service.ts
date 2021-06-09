import { CRUD } from "../../common/interfaces/crud.interface";
import debug from "debug";
import ProductsDao from "./products.dao";

const log: debug.IDebugger = debug("app:products-service");

class ProductsService implements CRUD {
  async getAll() {
    return ProductsDao.getAll();
  }
}

export default new ProductsService();
