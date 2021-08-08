import mongooseService from "../../common/services/mongoose.service";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
import debug from "debug";

const log: debug.IDebugger = debug("app:images-dao");

export interface Image extends mongoose.Document {
  image: string,
}

class ImagesDao {
  Schema = mongooseService.getMongoose().Schema;

  ImagesSchema = new this.Schema(
    {
      image: String
    },
    { timestamps: true }
  );

  Image = mongooseService
    .getMongoose()
    .model<Image>("Images", this.ImagesSchema);

  constructor() {
    log("Created new instance of StatesDao");
  }
  
  async saveImage(image: string) {
    const newImage = new this.Image({image: image})
    await newImage.save()
    return newImage
  }

  async getImageById(imageId: string) {
    return this.Image.findById(imageId)
  }

  async deleteImage(imageId: string) {
    return this.Image.findByIdAndDelete(imageId)
  }

}

export default new ImagesDao();
