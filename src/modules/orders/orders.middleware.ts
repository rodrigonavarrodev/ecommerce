import express from "express";
import OrdersService from "./orders.service";

class OrdersMiddleware {
  async validateObjectid(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (!req.params.orderId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send({
        errors: [{ msg: `not an objectid` }],
      });
    }
    next();
  }

  async validateOrderMongoId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (!req.body.orderId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send({
        errors: [{ msg: `not an objectid` }],
      });
    }
    next();
  }

  async validateOrderId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const order: any = await OrdersService.getOrderById(
      req.params.orderId || req.body.orderId
    );
    if (!order) {
      return res.status(400).send({
        errors: [{ msg: "the id does not belong to any order" }],
      });
    }
    next();
  }

  async vericateIsGeneratedOrder(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const order: any = await OrdersService.getOrderById(req.body.orderId);
    if (order.status !== "Generated") {
      return res.status(400).send({
        errors: [{ msg: "the order is not in generated state" }],
      });
    }
    next();
  }
}
export default new OrdersMiddleware();
