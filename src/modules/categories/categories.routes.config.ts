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

      .get(CategoriesController.getAllCategories) //consulta todas las categorias

      .post(
        body("name").isString().notEmpty(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        AuthValidationMiddleware.validJWTNeeded, //valida JWT
        AuthValidationMiddleware.isAdmin, //verifica si es Admin
        CategoriesMiddleware.verifyCategoryExists, //verifica que ese Name no exista (solo puede ingresar las enumeradas en el categoires.dao.ts)
        CategoriesController.createCategory //crea la categoria
      );

      this.app
      .route("/categories/:categoryId")

      .get(
        CategoriesMiddleware.validateObjectid, //valida que sea un id de mongo
        CategoriesMiddleware.validateCategoryId, //valida que el id pertenezca a un id de la coleccion Categories
        CategoriesController.getCategoryById //devuelve la categoria
      );

      //FALTA
      //Actualizar categoria
      //Borrar categoria

    return this.app;
  }
}
