import mongooseService from "../../common/services/mongoose.service";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
import debug from "debug";

const log: debug.IDebugger = debug("app:images-dao");

export interface Image extends mongoose.Document {
 
}

class ImagesDao {
  Schema = mongooseService.getMongoose().Schema;

  ImagesSchema = new this.Schema(
    {
      
    },
    { timestamps: true }
  );

  Image = mongooseService
    .getMongoose()
    .model<Image>("Images", this.ImagesSchema);

  constructor() {
    log("Created new instance of StatesDao");
  }

  

}

export default new ImagesDao();
