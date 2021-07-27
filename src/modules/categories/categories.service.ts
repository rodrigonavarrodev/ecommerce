import { CRUD } from "../../common/interfaces/crud.interface";
import debug from "debug";
import CategoriesDao from "./categories.dao";

const log: debug.IDebugger = debug("app:products-service");

class CategoriesService implements CRUD {
  async getAll() {
    return CategoriesDao.getAll();
  }

  async findByName(name: string) {
    return CategoriesDao.findByName(name);
  }

  async getCategoryById(id: string) {
    return CategoriesDao.getById(id)
  }

  async createCategory(resource: CategoriesModel.createCategory) {
    const category = await CategoriesDao.create(resource);
    return { ...this.categoryDetails(category) };
  }

  categoryDetails(product: any) {
    const { id, name } = product;
    return {
      id,
      name,
    };
  }
}

export default new CategoriesService();
