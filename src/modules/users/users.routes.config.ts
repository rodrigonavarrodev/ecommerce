import { CommonRoutesConfig } from "../../common/common.routes.config";
import BodyValidationMiddleware from "../../common/middleware/body.validation.middleware";
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
      body("admin").isBoolean().optional(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      UsersMiddleware.validateSameEmailDoesntExist,
      UsersMiddleware.isSecurePassword,
      UsersMiddleware.validatePhone,
      UsersMiddleware.validatePassword,
      UsersController.register
    );

    this.app.route("/users/login").post(
      body("email").isEmail().notEmpty(),
      body("password").isString().notEmpty(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      UsersMiddleware.validateEmailExists,
      UsersMiddleware.validateUserPassword,
      UsersController.login
    );

    return this.app;
  }
}
