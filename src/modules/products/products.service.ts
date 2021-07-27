import { CRUD } from "../../common/interfaces/crud.interface";
import debug from "debug";
import ProductsDao from "./products.dao";

const log: debug.IDebugger = debug("app:products-service");

class ProductsService implements CRUD {
  async getAll() {
    return ProductsDao.getAll();
  }

  async getProductById(id: string) {
    const product = await ProductsDao.getById(id);
    if (!product) {
      return;
    }
    return { ...this.productDetails(product) };
  }

  async createProduct(resource: ProductsModel.createProduct) {
    const product = await ProductsDao.create(resource);
    return { ...this.productDetails(product) };
  }

  async getProductsByCategory(categoryId: string) {
    return ProductsDao.getAllByCategory(categoryId);
  }

  async subtractProductStock(resource: any) {
    for (let i = 0; i < resource.products.length; i++) {
      const product: any = await this.getProductById(resource.products[i]._id);
      let stock = product.stock - resource.products[i].quantity
      await ProductsDao.updateStock(resource.products[i]._id, stock)
    }
  }

  productDetails(product: any) {
    const { id, name, category, price, stock, images } = product;
    return {
      id,
      name,
      category,
      price,
      stock,
      images,
    };
  }
}

export default new ProductsService();
