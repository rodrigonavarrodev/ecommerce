import express from "express";
import debug from "debug";
import OrdersService from "./orders.service";

const log: debug.IDebugger = debug("app:orders-controller");

class OrdersController {
  async getOrder(req: express.Request, res: express.Response) {
    try {
      //const cart = await OrdersService.getCart(req.jwt.userId);
      return res
        .status(200)
        //.send({ msg: "Successful response", data: cart });
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }

}

export default new OrdersController();
