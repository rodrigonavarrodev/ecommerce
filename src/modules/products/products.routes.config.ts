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

      .get(ProductsController.getAllProducts) //trae todos los productos creados

      .post(
        body("name").isString().notEmpty(),
        body("description").isString().notEmpty(),
        body("category").isString().notEmpty(),
        body("price").isNumeric().notEmpty(),
        body("stock").isNumeric().notEmpty(),
        body("images").isArray().optional(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        AuthValidationMiddleware.validJWTNeeded, //valida JWT
        AuthValidationMiddleware.isAdmin, //valida que sea usuario Admin
        ProductsMiddleware.validateObjectIdCategory, //valida que el categoryId sea un id de mongo
        ProductsMiddleware.validateIdCategory, //valida que el categoryId pertenezca a una caterogoria de la coleccion Categories
        ProductsController.createProduct //crea el producto
      );

    this.app
      .route("/products/:productId")

      .get(
        ProductsMiddleware.validateObjectid, //valida que sea un id de mongo
        ProductsMiddleware.validateProductId, //valida que el id pertenezca a un producto de la coleccion Products
        ProductsController.getProductById //ddevuelve el producto
      )

      .put(
        body("name").isString().optional(),
        body("description").isString().optional(),
        body("category").isString().optional(),
        body("price").isNumeric().optional(),
        body("stock").isNumeric().optional(),
        body("images").isArray().optional(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        AuthValidationMiddleware.validJWTNeeded, //valida JWT
        AuthValidationMiddleware.isAdmin, //valida que sea usuario Admin
        ProductsMiddleware.validateObjectid, //valida que sea un id de mongo
        ProductsMiddleware.validateProductId, //valida que el id pertenezca a un producto de la coleccion Products
        ProductsController.updateProduct //devuelve los productos pertenecientes a esa categoria
      )

      .delete(
        AuthValidationMiddleware.validJWTNeeded, //valida JWT
        AuthValidationMiddleware.isAdmin, //valida que sea usuario Admin
        ProductsMiddleware.validateObjectid, //valida que sea un id de mongo
        ProductsMiddleware.validateProductId, //valida que el id pertenezca a un producto de la coleccion Products
        ProductsController.deleteProduct //devuelve los productos pertenecientes a esa categoria
      );

    this.app
      .route("/products/categories/:categoryId") //REVEEER NOMBRE DE LA RUTA

      .get(
        CategoriesMiddleware.validateObjectid, //valida que categoryId sea un mongo id
        CategoriesMiddleware.validateCategoryId, //valida que el categoryId pertenezca a una caterogoria de la coleccion Categories
        ProductsController.getProductsByCategory //devuelve los productos pertenecientes a esa categoria
      )

      
    return this.app;
  }
}
