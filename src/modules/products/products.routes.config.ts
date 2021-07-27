import { CommonRoutesConfig } from "../../common/common.routes.config";
import { body } from "express-validator";
import BodyValidationMiddleware from "../../common/middleware/body.validation.middleware";
import ProductsController from "./products.controller";
import AuthValidationMiddleware from "../../common/middleware/auth.validation.middleware";
import express from "express";
import ProductsMiddleware from "./products.middleware";
import CategoriesMiddleware from "../categories/categories.middleware"

export class ProductsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "ProductsRoutes");
  }

  configureRoutes() {
    this.app
      .route("/products")

      .get(ProductsController.getAllProducts)

      .post(
        body("name").isString().notEmpty(),
        body("description").isString().notEmpty(),
        body("category").isString().notEmpty(),
        body("price").isNumeric().notEmpty(),
        body("stock").isNumeric().notEmpty(),
        body("images").isArray().optional(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        AuthValidationMiddleware.validJWTNeeded,
        AuthValidationMiddleware.isAdmin,
        ProductsMiddleware.validateObjectIdCategory,
        ProductsMiddleware.validateIdCategory,
        ProductsController.createProduct
      );

    this.app
      .route("/products/:productId")

      .get(
        ProductsMiddleware.validateObjectid,
        ProductsMiddleware.validateProductId,
        ProductsController.getProductById
      );

    this.app
      .route("/products/categories/:categoryId") //REVEEER LA RUTA

      .get(
        CategoriesMiddleware.validateObjectid,
        CategoriesMiddleware.validateCategoryId,
        ProductsController.getProductsByCategory
      );


      //Actualizar producto
      //Borrar producto
      //Buscar productos por categoria (Ver video Udemy)

    return this.app;
  }
}
