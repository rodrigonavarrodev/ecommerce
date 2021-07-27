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
        CartsController.getCart //consulta el carrito del usuario
      );

    this.app
      .route("/cart/addproduct")
      .post(
        body("productId").isString().notEmpty(),
        body("quantity").isString().notEmpty(),
        AuthValidationMiddleware.validJWTNeeded, //valida jwt
        CartsMiddleware.validateObjectid, //valida que productId sea un id de mongo
        CartsMiddleware.validateProductId, //valida que productId pertenzca a un producto de la coleccion Products
        CartsMiddleware.validateProductQuantity, // valida que haya stock
        CartsController.addProducts //agrega el producto y resta el stock
      );

    this.app
      .route("/cart/removeproduct")
      .post(
        body("_id").isString().notEmpty(), //id del producto dentro del carrito
        body("productId").isString().notEmpty(),
        body("quantity").isString().notEmpty(),
        AuthValidationMiddleware.validJWTNeeded, //valida jwt
        CartsMiddleware.validateProductIdinCart, //valida que el _id este en el carrito
        CartsMiddleware.validateProductQuantityinCart, //valida que la cantidad ingresada no sea mayor a la que hay en el carrito ni sea menor o igual a 0
        CartsMiddleware.validateProductId, //valida que productId pertenzca a un producto de la coleccion Products
        CartsController.removeProducts //elimina o resta cantidad del producto del carrito y suma el stock
      );

    return this.app;
  }
}
