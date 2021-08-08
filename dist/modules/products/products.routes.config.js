"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRoutes = void 0;
const common_routes_config_1 = require("../../common/common.routes.config");
const express_validator_1 = require("express-validator");
const body_validation_middleware_1 = __importDefault(require("../../common/middleware/body.validation.middleware"));
const products_controller_1 = __importDefault(require("./products.controller"));
const auth_validation_middleware_1 = __importDefault(require("../../common/middleware/auth.validation.middleware"));
const products_middleware_1 = __importDefault(require("./products.middleware"));
const categories_middleware_1 = __importDefault(require("../categories/categories.middleware"));
class ProductsRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "ProductsRoutes");
    }
    configureRoutes() {
        this.app
            .route("/products")
            .get(products_controller_1.default.getAllProducts) //trae todos los productos creados
            .post(express_validator_1.body("name").isString().notEmpty(), express_validator_1.body("description").isString().notEmpty(), express_validator_1.body("category").isString().notEmpty(), express_validator_1.body("price").isNumeric().notEmpty(), express_validator_1.body("stock").isNumeric().notEmpty(), express_validator_1.body("images").isArray().optional(), body_validation_middleware_1.default.verifyBodyFieldsErrors, auth_validation_middleware_1.default.validJWTNeeded, //valida JWT
        auth_validation_middleware_1.default.isAdmin, //valida que sea usuario Admin
        products_middleware_1.default.validateObjectIdCategory, //valida que el categoryId sea un id de mongo
        products_middleware_1.default.validateIdCategory, //valida que el categoryId pertenezca a una caterogoria de la coleccion Categories
        products_controller_1.default.createProduct //crea el producto
        );
        this.app
            .route("/products/:productId")
            .get(products_middleware_1.default.validateObjectid, //valida que sea un id de mongo
        products_middleware_1.default.validateProductId, //valida que el id pertenezca a un producto de la coleccion Products
        products_controller_1.default.getProductById //ddevuelve el producto
        )
            .put(express_validator_1.body("name").isString().optional(), express_validator_1.body("description").isString().optional(), express_validator_1.body("category").isString().optional(), express_validator_1.body("price").isNumeric().optional(), express_validator_1.body("stock").isNumeric().optional(), express_validator_1.body("images").isArray().optional(), body_validation_middleware_1.default.verifyBodyFieldsErrors, auth_validation_middleware_1.default.validJWTNeeded, //valida JWT
        auth_validation_middleware_1.default.isAdmin, //valida que sea usuario Admin
        products_middleware_1.default.validateObjectid, //valida que sea un id de mongo
        products_middleware_1.default.validateProductId, //valida que el id pertenezca a un producto de la coleccion Products
        products_controller_1.default.updateProduct //devuelve los productos pertenecientes a esa categoria
        )
            .delete(auth_validation_middleware_1.default.validJWTNeeded, //valida JWT
        auth_validation_middleware_1.default.isAdmin, //valida que sea usuario Admin
        products_middleware_1.default.validateObjectid, //valida que sea un id de mongo
        products_middleware_1.default.validateProductId, //valida que el id pertenezca a un producto de la coleccion Products
        products_controller_1.default.deleteProduct //devuelve los productos pertenecientes a esa categoria
        );
        this.app
            .route("/products/categories/:categoryId") //REVEEER NOMBRE DE LA RUTA
            .get(categories_middleware_1.default.validateObjectid, //valida que categoryId sea un mongo id
        categories_middleware_1.default.validateCategoryId, //valida que el categoryId pertenezca a una caterogoria de la coleccion Categories
        products_controller_1.default.getProductsByCategory //devuelve los productos pertenecientes a esa categoria
        );
        return this.app;
    }
}
exports.ProductsRoutes = ProductsRoutes;
//# sourceMappingURL=products.routes.config.js.map