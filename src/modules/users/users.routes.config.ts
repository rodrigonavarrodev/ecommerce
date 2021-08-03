import { CommonRoutesConfig } from "../../common/common.routes.config";
import BodyValidationMiddleware from "../../common/middleware/body.validation.middleware";
import AuthValidationMiddleware from "../../common/middleware/auth.validation.middleware";
import UsersMiddleware from "./users.middleware";
import UsersController from "./users.controller";
import { body } from "express-validator";

import express from "express";

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
  }

  configureRoutes() {
    this.app.route("/users/register").post(
      body("email").isEmail().notEmpty(),
      body("password").isString().notEmpty(),
      body("confirmpassword").isString().notEmpty(),
      body("firstname").isString().notEmpty(),
      body("lastname").isString().notEmpty(),
      body("phone").isString().notEmpty(),
      body("admin").isBoolean().optional(), //es optional, por defecto va en false
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      UsersMiddleware.validateSameEmailDoesntExist, //verifica que el email ingresado ya exista
      UsersMiddleware.isSecurePassword, //verifica que la contraseña sea segura
      UsersMiddleware.validatePhone, //verifica que el formato de telefono sea correcto
      UsersMiddleware.validatePassword, //verifica que las 2 contraseñas sean iguales
      UsersController.register //registra el nuevo usuario y crea un carrito vacio
    );

    this.app.route("/users/login").post(
      body("email").isEmail().notEmpty(),
      body("password").isString().notEmpty(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      UsersMiddleware.validateEmailExists, //verifica que sea un email registrado
      UsersMiddleware.validateUserPassword, //verifica la contraseña
      UsersController.login //se loguea y devuelve token
    );

    this.app.route("/users/info").get(
      AuthValidationMiddleware.validJWTNeeded, //valida JWT
      UsersController.getUserInfo
    )

    return this.app;
  }
}
