"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_service_1 = __importDefault(require("../../common/services/mongoose.service"));
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const debug_1 = __importDefault(require("debug"));
const log = debug_1.default("app:categories-dao");
class CategoriesDao {
    constructor() {
        this.Schema = mongoose_service_1.default.getMongoose().Schema;
        this.CategoriesSchema = new this.Schema({
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
        }, { timestamps: false });
        this.Category = mongoose_service_1.default
            .getMongoose()
            .model("Categories", this.CategoriesSchema);
        log("Created new instance of StatesDao");
    }
    create(categoriesFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = new this.Category(Object.assign({}, categoriesFields));
            yield category.save();
            return category;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Category.find().exec();
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Category.findOne({ name });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Category.findById(id);
        });
    }
    update(id, categoriesFields) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Category.findByIdAndUpdate({ _id: id }, { $set: { name: categoriesFields.name } }, { new: true });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Category.findByIdAndDelete(id);
        });
    }
}
exports.default = new CategoriesDao();
//# sourceMappingURL=categories.dao.js.map