import express from "express";
import { ObjectId } from "mongodb";
import CategoriesService from "../categories/categories.service";
import ProductsService from "./products.service";

class ProductsMiddleware {
  async validateObjectid(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (!req.params.productId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send({
        errors: [{ msg: "not an objectid" }],
      });
    }
    next();
  }

  async validateProductId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const product: any = await ProductsService.getProductById(
      req.params.productId
    );
    if (!product) {
      return res.status(400).send({
        errors: [{ msg: "the id does not belong to any product" }],
      });
    }
    next();
  }

  async validateObjectIdCategory(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (!req.body.category.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send({
        errors: [{ msg: "not an objectid" }],
      });
    }
    next();
  }

  async validateIdCategory(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const category: any = await CategoriesService.getCategoryById(
      req.body.category
    );
    if (!category) {
      return res.status(400).send({
        errors: [{ msg: "wrong category id" }],
      });
    }
    next();
  }
}

export default new ProductsMiddleware();
