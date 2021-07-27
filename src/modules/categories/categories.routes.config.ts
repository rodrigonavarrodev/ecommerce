import { CommonRoutesConfig } from "../../common/common.routes.config";
import { body } from "express-validator";
import BodyValidationMiddleware from "../../common/middleware/body.validation.middleware";
import CategoriesController from "./categories.controller";
import AuthValidationMiddleware from "../../common/middleware/auth.validation.middleware";
import express from "express";
import CategoriesMiddleware from "./categories.middleware";

export class CategoriesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "CategoriesRoutes");
  }

  configureRoutes() {
    this.app
      .route("/categories")

      .get(CategoriesController.getAllCategories)

      .post(
        body("name").isString().notEmpty(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        AuthValidationMiddleware.validJWTNeeded,
        AuthValidationMiddleware.isAdmin,
        CategoriesMiddleware.verifyCategoryExists,
        CategoriesController.createCategory
      );

      this.app
      .route("/categories/:categoryId")

      .get(
        CategoriesMiddleware.validateObjectid,
        CategoriesMiddleware.validateCategoryId,
        CategoriesController.getCategoryById
      );

      //Actualizar producto
      //Borrar producto
      //Buscar productos por categoria (Ver video Udemy)

    return this.app;
  }
}
