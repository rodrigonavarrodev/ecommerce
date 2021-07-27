import express from "express";
import ProductsService from "../products/products.service";

class CartsMiddleware {
  async validateObjectid(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    for (let i = 0; i < req.body.products.length; i++) {
      if (!req.body.products[i]._id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).send({
          errors: [{ msg: `${req.body.products[i]._id} not an objectid` }],
        });
      }
    }
    next();
  }

  async validateProductId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    for (let i = 0; i < req.body.products.length; i++) {
      const product: any = await ProductsService.getProductById(
        req.body.products[i]._id
      );
      if (!product) {
        return res.status(400).send({
          errors: [
            {
              msg: `the id ${req.body.products[i]._id} does not belong to any product`,
            },
          ],
        });
      }
    }
    next();
  }

  async validateProductQuantity(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    for (let i = 0; i < req.body.products.length; i++) {
      const product: any = await ProductsService.getProductById(
        req.body.products[i]._id
      );
      if (product.stock < req.body.products[i].quantity) {
        return res.status(400).send({
          errors: [
            {
              msg: `there is no stock of the product with id ${req.body.products[i]._id}`,
            },
          ],
        });
      }
    }
    next();
  }
}

export default new CartsMiddleware();
