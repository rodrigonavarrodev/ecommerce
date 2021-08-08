"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesRoutes = void 0;
const common_routes_config_1 = require("../../common/common.routes.config");
const express_validator_1 = require("express-validator");
const body_validation_middleware_1 = __importDefault(require("../../common/middleware/body.validation.middleware"));
const categories_controller_1 = __importDefault(require("./categories.controller"));
const auth_validation_middleware_1 = __importDefault(require("../../common/middleware/auth.validation.middleware"));
const categories_middleware_1 = __importDefault(require("./categories.middleware"));
class CategoriesRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "CategoriesRoutes");
    }
    configureRoutes() {
        this.app
            .route("/categories")
            .get(categories_controller_1.default.getAllCategories) //consulta todas las categorias
            .post(express_validator_1.body("name").isString().notEmpty(), body_validation_middleware_1.default.verifyBodyFieldsErrors, auth_validation_middleware_1.default.validJWTNeeded, //valida JWT
        auth_validation_middleware_1.default.isAdmin, //verifica si es Admin
        categories_middleware_1.default.verifyCategoryExists, //verifica que ese Name no exista (solo puede ingresar las enumeradas en el categoires.dao.ts)
        categories_controller_1.default.createCategory //crea la categoria
        );
        this.app
            .route("/categories/:categoryId")
            .get(categories_middleware_1.default.validateObjectid, //valida que sea un id de mongo
        categories_middleware_1.default.validateCategoryId, //valida que el id pertenezca a un id de la coleccion Categories
        categories_controller_1.default.getCategoryById //devuelve la categoria
        )
            .put(express_validator_1.body("name").isString().notEmpty(), body_validation_middleware_1.default.verifyBodyFieldsErrors, auth_validation_middleware_1.default.validJWTNeeded, //valida JWT
        auth_validation_middleware_1.default.isAdmin, //verifica si es Admin
        categories_middleware_1.default.validateObjectid, //valida que sea un id de mongo
        categories_middleware_1.default.validateCategoryId, //valida que el id pertenezca a un id de la coleccion Categories
        categories_middleware_1.default.verifyCategoryExists, //verifica que ese Name no exista (solo puede ingresar las enumeradas en el categoires.dao.ts)
        categories_controller_1.default.updateCategory //crea la categoria
        )
            .delete(auth_validation_middleware_1.default.validJWTNeeded, //valida JWT
        auth_validation_middleware_1.default.isAdmin, //verifica si es Admin
        categories_middleware_1.default.validateObjectid, //valida que sea un id de mongo
        categories_middleware_1.default.validateCategoryId, //valida que el id pertenezca a un id de la coleccion Categories
        categories_controller_1.default.deleteCategory //crea la categoria
        );
        return this.app;
    }
}
exports.CategoriesRoutes = CategoriesRoutes;
//# sourceMappingURL=categories.routes.config.js.map