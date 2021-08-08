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
const images_service_1 = __importDefault(require("./images.service"));
const log = debug_1.default("app:products-controller");
class ImagesController {
    uploadImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const imageName = req.file;
                const image = yield images_service_1.default.uploadImage(imageName);
                return res.status(200).send({ msg: "Successful response", data: image });
            }
            catch (error) {
                if (error.msg) {
                    return res.status(400).send({ errors: [error] });
                }
                else {
                    return res.status(400).send({ errors: [error.message] });
                }
            }
        });
    }
    getImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const image = yield images_service_1.default.getImageUrl(req.params.imageId);
                return res
                    .status(200)
                    .send({ msg: "Successful response", data: image });
            }
            catch (error) {
                if (error.msg) {
                    return res.status(400).send({ errors: [error] });
                }
                else {
                    return res.status(400).send({ errors: [error.message] });
                }
            }
        });
    }
    deleteImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const image = yield images_service_1.default.deleteImage(req.params.imageId);
                return res
                    .status(200)
                    .send({ msg: "Successful response", data: image });
            }
            catch (error) {
                if (error.msg) {
                    return res.status(400).send({ errors: [error] });
                }
                else {
                    return res.status(400).send({ errors: [error.message] });
                }
            }
        });
    }
}
exports.default = new ImagesController();
//# sourceMappingURL=images.controller.js.map