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
const log = debug_1.default("app:images-dao");
class ImagesDao {
    constructor() {
        this.Schema = mongoose_service_1.default.getMongoose().Schema;
        this.ImagesSchema = new this.Schema({
            image: String
        }, { timestamps: true });
        this.Image = mongoose_service_1.default
            .getMongoose()
            .model("Images", this.ImagesSchema);
        log("Created new instance of StatesDao");
    }
    saveImage(image) {
        return __awaiter(this, void 0, void 0, function* () {
            const newImage = new this.Image({ image: image });
            yield newImage.save();
            return newImage;
        });
    }
    getImageById(imageId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Image.findById(imageId);
        });
    }
    deleteImage(imageId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Image.findByIdAndDelete(imageId);
        });
    }
}
exports.default = new ImagesDao();
//# sourceMappingURL=images.dao.js.map