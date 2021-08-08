import mongooseService from "../../common/services/mongoose.service";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
import debug from "debug";

const log: debug.IDebugger = debug("app:categories-dao");

export interface Category extends mongoose.Document {
  name: string;
}

class CategoriesDao {
  Schema = mongooseService.getMongoose().Schema;

  CategoriesSchema = new this.Schema(
    {
      name: {
        type: String,
        enum: [
          "Perifericos",
          "Notebooks",
          "Sillas",
          "Audio",
          "Video",
          "Software",
          "Otros",
        ],
      },
    },
    { timestamps: false }
  );

  Category = mongooseService
    .getMongoose()
    .model<Category>("Categories", this.CategoriesSchema);

  constructor() {
    log("Created new instance of StatesDao");
  }

  async create(categoriesFields: CategoriesModel.createCategory) {
    const category = new this.Category({ ...categoriesFields });
    await category.save();
    return category;
  }

  async getAll() {
    return this.Category.find().exec();
  }

  async findByName(name: string) {
    return this.Category.findOne({ name });
  }

  async getById(id: string) {
    return this.Category.findById(id);
  }

  async update(id: string, categoriesFields: CategoriesModel.createCategory) {
    return this.Category.findByIdAndUpdate(
      { _id: id },
      { $set: { name: categoriesFields.name } },
      { new: true }
    );
  }

  async delete(id: string) {
    return this.Category.findByIdAndDelete(id);
  }
}

export default new CategoriesDao();
