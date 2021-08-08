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
const images_service_1 = __importDefault(require("./images.service"));
class ImagesMiddleware {
    validateObjectid(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.params.imageId.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(400).send({
                    errors: [{ msg: "not an objectid" }],
                });
            }
            next();
        });
    }
    validateImageId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = yield images_service_1.default.getImageById(req.params.imageId);
            if (!image) {
                return res.status(400).send({
                    errors: [{ msg: "the id does not belong to any image" }],
                });
            }
            next();
        });
    }
    validateImageFormat(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const type = (_a = req.file) === null || _a === void 0 ? void 0 : _a.mimetype;
            if (!(type === "image/png" || type === "image/jpg")) {
                return res.status(400).send({
                    errors: [{ msg: `not a permitted image format ` }],
                });
            }
            next();
        });
    }
    validateImageSize(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const size = (_a = req.file) === null || _a === void 0 ? void 0 : _a.size;
            if (size > 200000) {
                return res.status(400).send({
                    errors: [{ msg: `the image must be less than 2 mb` }],
                });
            }
            next();
        });
    }
}
exports.default = new ImagesMiddleware();
//# sourceMappingURL=images.middleware.js.map