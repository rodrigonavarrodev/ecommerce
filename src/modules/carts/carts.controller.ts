import express from "express";
import debug from "debug";
import CartsService from "./carts.service";
import ProductsService from "../products/products.service";

const log: debug.IDebugger = debug("app:products-controller");

class CartsController {
  async getCart(req: express.Request, res: express.Response) {
    try {
      const cart = await CartsService.getCart(req.jwt.userId);
      return res
        .status(200)
        .send({ msg: "Successful response", data: cart });
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }

  async addProducts(req: express.Request, res: express.Response) {
    try {
      const cart = await CartsService.addProducts(req.jwt.userId, req.body);
      await ProductsService.subtractProductStock(req.body) //resto stock en el producto
      return res
        .status(200)
        .send({ msg: "Successful response", data: cart });
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }

  async removeProducts(req: express.Request, res: express.Response) {
    try {
      const cart = await CartsService.removeProducts(req.jwt.userId, req.body);
      await ProductsService.addProductStock(req.body) //sumo stock en el producto
      return res
        .status(200)
        .send({ msg: "Successful response", data: cart });
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }

}

export default new CartsController();
