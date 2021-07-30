import express from "express";

class OrdersMiddleware {
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
}
export default new OrdersMiddleware();

