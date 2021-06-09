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
      body("password")
        .isString()
        .isLength({ min: 6 })
        .withMessage("The password must be 6 alphanumeric characters")
        .matches(/^[0-9a-zA-Z]+$/),
      body("confirmpassword")
        .isString()
        .isLength({ min: 6 })
        .withMessage("The password must be 6 alphanumeric characters")
        .matches(/^[0-9a-zA-Z]+$/),
      body("firstname").isString().notEmpty(),
      body("lastname").isString().notEmpty(),
      body("address").isString().optional(),
      body("city").isString().optional(),
      body("country").isString().optional(),
      body("datebirth").isString().optional(),
      body("phone").isString().optional(),
      body("profilepic").isString().optional(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      UsersMiddleware.validatePassword,
      UsersController.register
    );

    this.app.route("/users/login").post(
      body("email").isEmail().notEmpty(),
      body("password")
        .isString()
        .isLength({ min: 6 })
        .withMessage("The password must be 6 alphanumeric characters")
        .matches(/^[0-9a-zA-Z]+$/),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      UsersMiddleware.validateEmailExists,
      UsersMiddleware.validateUserPassword,
      UsersController.login
    );

    return this.app;
  }
}
