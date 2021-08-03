import express from "express";
import debug from "debug";
import OrdersService from "./orders.service";

const log: debug.IDebugger = debug("app:orders-controller");

class OrdersController {
  async getOrders(req: express.Request, res: express.Response) {
    try {
      const orders = await OrdersService.getOrders(req.jwt.userId);
      return res
        .status(200)
        .send({ msg: "Successful response", data: orders });
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }

  async getOrderById(req: express.Request, res: express.Response) {
    try {
      const order = await OrdersService.getOrderById(req.params.orderId);
      return res
        .status(200)
        .send({ msg: "Successful response", data: order });
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }

  async completeOrder(req: express.Request, res: express.Response) {
    try {
      const order = await OrdersService.completeOrder(req.body.orderId);
      return res
        .status(200)
        .send({ msg: "Successful response", data: order });
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
