import express from "express";

class ImagesMiddleware {
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
