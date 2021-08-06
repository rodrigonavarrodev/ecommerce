import { CRUD } from "../../common/interfaces/crud.interface";
import debug from "debug";
import config from "../../config/config";
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
cloudinary.config(config.cloundinaryUrl);

const log: debug.IDebugger = debug("app:images-service");

class ImagesService implements CRUD {
  async uploadImage(file: any) {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        (error: any, result: any) => {
          if (result) {
            resolve(result.secure_url);
          } else {
            reject(error);
          }
        }
      );
      streamifier.createReadStream(file.buffer).pipe(stream);
    });
  }
}

export default new ImagesService();
