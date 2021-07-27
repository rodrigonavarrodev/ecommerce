import { CommonRoutesConfig } from "../../common/common.routes.config";
import { body } from "express-validator";
import BodyValidationMiddleware from "../../common/middleware/body.validation.middleware";
import CartsController from "./carts.controller";
import AuthValidationMiddleware from "../../common/middleware/auth.validation.middleware";
import CartsMiddleware from "./carts.middleware";
import express from "express";

export class CartsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "CartsRoutes");
  }

  configureRoutes() {
    this.app
      .route("/cart")

      .get(
        AuthValidationMiddleware.validJWTNeeded, 
        CartsController.getCart
      )

      .post(
        body("products").isArray().notEmpty(),
        AuthValidationMiddleware.validJWTNeeded,
        CartsMiddleware.validateObjectid,
        CartsMiddleware.validateProductId,
        CartsMiddleware.validateProductQuantity,
        CartsController.addProducts
      )

    return this.app;
  }
}
