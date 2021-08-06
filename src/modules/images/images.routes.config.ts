import { CommonRoutesConfig } from "../../common/common.routes.config";
import { body } from "express-validator";
import BodyValidationMiddleware from "../../common/middleware/body.validation.middleware";
import AuthValidationMiddleware from "../../common/middleware/auth.validation.middleware";
import ImagesController from "./images.controller";
import ImagesService from "./images.service";
import ImagesMiddleware from "./images.middleware";
import express from "express";

import multer from "multer";
let upload = multer({ storage: multer.memoryStorage() })

export class ImagesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "ImagesRoutes");
  }

  configureRoutes() {
    this.app
      .route("/images/upload")
      .post(
        upload.single("file"), 
        //ImagesMiddleware.validateImageFormat,
        //ImagesMiddleware.validateImageSize,
        ImagesController.uploadImage
      );

    return this.app;
  }
}
