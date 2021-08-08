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
const debug_1 = __importDefault(require("debug"));
const config_1 = __importDefault(require("../../config/config"));
const images_dao_1 = __importDefault(require("./images.dao"));
const products_service_1 = __importDefault(require("../products/products.service"));
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
cloudinary.config(config_1.default.cloundinaryUrl);
const log = debug_1.default("app:images-service");
class ImagesService {
    uploadImage(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = yield this.uploadImageCloudinary(file);
            const destructuringImagen = image.split('/');
            const name = destructuringImagen[destructuringImagen.length - 1];
            const version = destructuringImagen[destructuringImagen.length - 2];
            //guardo el nombre de la imagen en la base de datos
            const imageDB = yield this.saveImageDB(`${version}/${name}`);
            return {
                imageId: imageDB === null || imageDB === void 0 ? void 0 : imageDB.id,
                imageUrl: `${config_1.default.cloudinaryPath}${version}/${name}`
            };
        });
    }
    deleteImage(imageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = yield images_dao_1.default.getImageById(imageId);
            const destructuringImagen = image.image.split('/');
            const name = destructuringImagen[destructuringImagen.length - 1];
            const [publicId] = name.split('.');
            yield this.deleteProductReferenceImage(imageId); //borro del los productos que tienen esta imagen
            yield cloudinary.uploader.destroy(publicId); //borro de cloudinary
            yield images_dao_1.default.deleteImage(imageId); //borro de la base de datos
            return image;
        });
    }
    deleteProductReferenceImage(imageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield products_service_1.default.getAll();
            for (let i = 0; i < products.length; i++) {
                let array = products[i].images;
                array = array.filter((x) => x.id !== imageId);
                yield products_service_1.default.deleteImageReference(products[i].id, array);
            }
            return;
        });
    }
    uploadImageCloudinary(file) {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream((error, result) => {
                if (result) {
                    resolve(result.secure_url);
                }
                else {
                    reject(error);
                }
            });
            streamifier.createReadStream(file.buffer).pipe(stream);
        });
    }
    saveImageDB(image) {
        return __awaiter(this, void 0, void 0, function* () {
            return images_dao_1.default.saveImage(image);
        });
    }
    getImageById(imageId) {
        return __awaiter(this, void 0, void 0, function* () {
            return images_dao_1.default.getImageById(imageId);
        });
    }
    getImageUrl(imageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const imageName = yield images_dao_1.default.getImageById(imageId);
            return {
                imageId: imageName === null || imageName === void 0 ? void 0 : imageName.id,
                imageUrl: `${config_1.default.cloudinaryPath}${imageName === null || imageName === void 0 ? void 0 : imageName.image}`
            };
        });
    }
}
exports.default = new ImagesService();
//# sourceMappingURL=images.service.js.map