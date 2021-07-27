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
    const product: any = await this.getProductById(resource.productId);
    let stock = product.stock - resource.quantity
    await ProductsDao.updateStock(resource.productId, stock)
  }

  async addProductStock(resource: any) {
    const product: any = await this.getProductById(resource.productId);
    let stock = product.stock + resource.quantity
    await ProductsDao.updateStock(resource.productId, stock)
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
