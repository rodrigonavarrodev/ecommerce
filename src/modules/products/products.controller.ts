import express from "express";
import debug from "debug";
import ProductsService from "./products.service";

const log: debug.IDebugger = debug("app:products-controller");

class ProductsController {
  async getAllProducts(req: express.Request, res: express.Response) {
    try {
      const products = await ProductsService.getAll();
      return res
        .status(200)
        .send({ msg: "Successful response", data: products });
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }

  async getProductById(req: express.Request, res: express.Response) {
    try {
      const product = await ProductsService.getProductById(
        req.params.productId
      );
      return res
        .status(200)
        .send({ msg: "Successful response", data: product });
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }

  async createProduct(req: express.Request, res: express.Response) {
    try {
      const product = await ProductsService.createProduct(req.body);
      return res.status(201).send({ msg: "Successful created", data: product });
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }

  async getProductsByCategory(req: express.Request, res: express.Response) {
    try {
      const products = await ProductsService.getProductsByCategory(
        req.params.categoryId
      );
      return res
        .status(200)
        .send({ msg: "Successful response", data: products });
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
