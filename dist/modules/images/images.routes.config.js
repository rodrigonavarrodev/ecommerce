"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesRoutes = void 0;
const common_routes_config_1 = require("../../common/common.routes.config");
const auth_validation_middleware_1 = __importDefault(require("../../common/middleware/auth.validation.middleware"));
const images_controller_1 = __importDefault(require("./images.controller"));
const images_middleware_1 = __importDefault(require("./images.middleware"));
const multer_1 = __importDefault(require("multer"));
let upload = multer_1.default({ storage: multer_1.default.memoryStorage() });
class ImagesRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "ImagesRoutes");
    }
    configureRoutes() {
        this.app
            .route("/image/upload")
            .post(upload.single("file"), auth_validation_middleware_1.default.validJWTNeeded, //valida JWT
        auth_validation_middleware_1.default.isAdmin, //valida que sea usuario Admin
        images_middleware_1.default.validateImageFormat, //valida que solo sea png o jpg
        images_middleware_1.default.validateImageSize, //valida el peso de la imagen
        images_controller_1.default.uploadImage //sube la imagen a cloudinary y guarda en la DB
        );
        this.app
            .route("/image/:imageId")
            .get(auth_validation_middleware_1.default.validJWTNeeded, //valida JWT
        images_middleware_1.default.validateObjectid, images_middleware_1.default.validateImageId, images_controller_1.default.getImage //sube la imagen a cloudinary y guarda en la DB
        );
        this.app
            .route("/image/:imageId")
            .delete(auth_validation_middleware_1.default.validJWTNeeded, //valida JWT
        auth_validation_middleware_1.default.isAdmin, //valida que sea usuario Admin
        images_middleware_1.default.validateObjectid, images_middleware_1.default.validateImageId, images_controller_1.default.deleteImage //sube la imagen a cloudinary y guarda en la DB
        );
        return this.app;
    }
}
exports.ImagesRoutes = ImagesRoutes;
//# sourceMappingURL=images.routes.config.js.map