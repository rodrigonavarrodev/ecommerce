import express from "express";
import debug from "debug";
import ImagesService from "./images.service";

const log: debug.IDebugger = debug("app:products-controller");

class ImagesController {
  async uploadImage(req: express.Request, res: express.Response) {
    try {
      const imageName: any = req.file;
      const image = await ImagesService.uploadImage(imageName);
      return res.status(200).send({ msg: "Successful response", data: image });
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }

  async getImage(req: express.Request, res: express.Response) {
    try {
      const image = await ImagesService.getImageUrl(req.params.imageId);
      return res
        .status(200)
        .send({ msg: "Successful response", data: image });
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }

  async deleteImage(req: express.Request, res: express.Response) {
    try {
      const image = await ImagesService.deleteImage(req.params.imageId);
      return res
        .status(200)
        .send({ msg: "Successful response", data: image });
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }
}

export default new ImagesController();
