import { CommonRoutesConfig } from "../../common/common.routes.config";
import { body } from "express-validator";
import BodyValidationMiddleware from "../../common/middleware/body.validation.middleware";
import OrdersController from "./orders.controller";
import AuthValidationMiddleware from "../../common/middleware/auth.validation.middleware";

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
        //OrdersController.getOrder
      );

   

    return this.app;
  }
}
