import { CommonRoutesConfig } from "../../common/common.routes.config";
import { body } from "express-validator";
import BodyValidationMiddleware from "../../common/middleware/body.validation.middleware";
import OrdersController from "./orders.controller";
import AuthValidationMiddleware from "../../common/middleware/auth.validation.middleware";
import OrdersMiddleware from "./orders.middleware";

import express from "express";

export class OrdersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "OrderssRoutes");
  }

  configureRoutes() {
    this.app
      .route("/orders")
      .get(
        AuthValidationMiddleware.validJWTNeeded, 
        OrdersController.getOrders
        )

    this.app
      .route("/orders/:orderId")
      .get(
      AuthValidationMiddleware.validJWTNeeded,
      OrdersMiddleware.validateObjectid,
      OrdersMiddleware.validateOrderId,
      OrdersController.getOrderById
      )

    this.app
    .route("/orders/complete")
        .post(
          body("orderId").isString().notEmpty(),
          BodyValidationMiddleware.verifyBodyFieldsErrors,
          AuthValidationMiddleware.validJWTNeeded,
          AuthValidationMiddleware.isAdmin,
          OrdersMiddleware.validateOrderMongoId,
          OrdersMiddleware.validateOrderId,
          OrdersMiddleware.vericateIsGeneratedOrder,
          OrdersController.completeOrder
        )
    return this.app;
  }
}
