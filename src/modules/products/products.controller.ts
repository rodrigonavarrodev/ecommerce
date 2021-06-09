import express from "express";
import debug from "debug";
import ProductsService from "./products.service";

const log: debug.IDebugger = debug("app:products-controller");

class ProductsController {
  async getAllProducts(req: express.Request, res: express.Response) {
    try {
      const products = await ProductsService.getAll();
      return res.status(200).send(products);
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }
}

export default new ProductsController();
