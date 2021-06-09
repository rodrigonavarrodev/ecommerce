import { CommonRoutesConfig } from "../../common/common.routes.config";
import { body } from "express-validator";
import ProductsController from "./products.controller";
import AuthValidationMiddleware from '../../common/middleware/auth.validation.middleware'
import express from "express";

export class ProductsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "ProductsRoutes");
  }

  configureRoutes() {
    this.app.route("/products").get(
      AuthValidationMiddleware.validJWTNeeded,
      ProductsController.getAllProducts
    )

    return this.app;
  }
}
