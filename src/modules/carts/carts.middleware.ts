import express from "express";
import ProductsService from "../products/products.service";
import CartsService from "../carts/carts.service";
class CartsMiddleware {
  async validateObjectid(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (!req.body.productId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send({
        errors: [{ msg: `not an objectid` }],
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
      req.body.productId
    );
    if (!product) {
      return res.status(400).send({
        errors: [
          {
            msg: `the id does not belong to any product`,
          },
        ],
      });
    }
    next();
  }

  async validateProductIdinCart(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const cart: any = await CartsService.getCart(req.jwt.userId);
    const found = cart.products.find(
      (element: any) => element._id == req.body._id
    );
    if (!found) {
      return res.status(400).send({
        errors: [
          {
            msg: `does not exist in the cart`,
          },
        ],
      });
    }

    next();
  }

  async validateProductQuantity(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const product: any = await ProductsService.getProductById(
      req.body.productId
    );
    if (product.stock < req.body.quantity) {
      return res.status(400).send({
        errors: [
          {
            msg: `there is no stock of the product`,
          },
        ],
      });
    }
    next();
  }

  async validateProductQuantityinCart(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const cart: any = await CartsService.getCart(req.jwt.userId);
    const found = cart.products.find(
      (element: any) => element._id == req.body._id
    );
    if (found.quantity < req.body.quantity || req.body.quantity <= 0) {
      return res.status(400).send({
        errors: [
          {
            msg: `Incorrect quantity. there are ${found.quantity} in the cart`,
          },
        ],
      });
    }
    next();
  }

  async validateEmpyCart(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const cart: any = await CartsService.getCart(req.jwt.userId);

    if (cart.products.length == 0) {
      return res.status(400).send({
        errors: [
          {
            msg: `There are no products in the cart`,
          },
        ],
      });
    }
    next();
  }

  async validateProductsinCart(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const cart: any = await CartsService.getCart(req.jwt.userId);

    for (let i = 0; i < cart.products.length; i++) {
      const product: any = await ProductsService.getProductById(
        cart.products[i].productId
      );
      if (!product) {
        return res.status(400).send({
          errors: [
            {
              msg: `the id ${cart.products[i].productId} does not belong to any product`,
            },
          ],
        });
      }
    }
    next();
  }


  //No se valida antes de crear la orden porque ya lo habia descontado del stock del producto
  async validateProductsInCartQuantity(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const cart: any = await CartsService.getCart(req.jwt.userId);

    for (let i = 0; i < cart.products.length; i++) {
      const product: any = await ProductsService.getProductById(
        cart.products[i].productId
      );
      if (product.stock < req.body.products[i].quantity) {
        return res.status(400).send({
          errors: [
            {
              msg: `there is no stock of the product with id ${cart.products[i].productId}`,
            },
          ],
        });
      }
    }
    next();
  }
}

export default new CartsMiddleware();

//para varios ID

/* async validateObjectsid(
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



} */
