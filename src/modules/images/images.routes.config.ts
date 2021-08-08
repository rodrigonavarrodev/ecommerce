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
      .route("/image/upload")
      .post(
        upload.single("file"), 
        AuthValidationMiddleware.validJWTNeeded, //valida JWT
        AuthValidationMiddleware.isAdmin, //valida que sea usuario Admin
        ImagesMiddleware.validateImageFormat, //valida que solo sea png o jpg
        ImagesMiddleware.validateImageSize, //valida el peso de la imagen
        ImagesController.uploadImage //sube la imagen a cloudinary y guarda en la DB
      );

    this.app
      .route("/image/:imageId")
      .get(
        AuthValidationMiddleware.validJWTNeeded, //valida JWT
        ImagesMiddleware.validateObjectid,
        ImagesMiddleware.validateImageId,
        ImagesController.getImage //sube la imagen a cloudinary y guarda en la DB
      );

    this.app
      .route("/image/:imageId")
      .delete(
        AuthValidationMiddleware.validJWTNeeded, //valida JWT
        AuthValidationMiddleware.isAdmin, //valida que sea usuario Admin
        ImagesMiddleware.validateObjectid,
        ImagesMiddleware.validateImageId,
        ImagesController.deleteImage //sube la imagen a cloudinary y guarda en la DB
      );

    return this.app;
  }
}
