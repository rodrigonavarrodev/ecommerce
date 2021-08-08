import express from "express";
import ImagesService from "./images.service";

class ImagesMiddleware {

  async validateObjectid(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (!req.params.imageId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send({
        errors: [{ msg: "not an objectid" }],
      });
    }
    next();
  }

  async validateImageId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const image: any = await ImagesService.getImageById(
      req.params.imageId
    );
    if (!image) {
      return res.status(400).send({
        errors: [{ msg: "the id does not belong to any image" }],
      });
    }
    next();
  }

  async validateImageFormat(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const type = req.file?.mimetype;
    if (!(type === "image/png" || type === "image/jpg")) {
      return res.status(400).send({
        errors: [{ msg: `not a permitted image format ` }],
      });
    }
    next();
  }

  async validateImageSize(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const size: any = req.file?.size;    
    if (size > 200000) {
      return res.status(400).send({
        errors: [{ msg: `the image must be less than 2 mb` }],
      });
    }
    next();
  }
}

export default new ImagesMiddleware();
