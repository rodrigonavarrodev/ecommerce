"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartsRoutes = void 0;
const common_routes_config_1 = require("../../common/common.routes.config");
const express_validator_1 = require("express-validator");
const carts_controller_1 = __importDefault(require("./carts.controller"));
const auth_validation_middleware_1 = __importDefault(require("../../common/middleware/auth.validation.middleware"));
const carts_middleware_1 = __importDefault(require("./carts.middleware"));
class CartsRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "CartsRoutes");
    }
    configureRoutes() {
        this.app
            .route("/cart")
            .get(auth_validation_middleware_1.default.validJWTNeeded, carts_controller_1.default.getCart //consulta el carrito del usuario
        );
        this.app
            .route("/cart/addproduct")
            .post(express_validator_1.body("productId").isString().notEmpty(), express_validator_1.body("quantity").isString().notEmpty(), auth_validation_middleware_1.default.validJWTNeeded, //valida jwt
        carts_middleware_1.default.validateObjectid, //valida que productId sea un id de mongo
        carts_middleware_1.default.validateProductId, //valida que productId pertenzca a un producto de la coleccion Products
        carts_middleware_1.default.validateProductQuantity, // valida que haya stock
        carts_controller_1.default.addProducts //agrega el producto y resta el stock
        );
        this.app
            .route("/cart/removeproduct")
            .post(express_validator_1.body("_id").isString().notEmpty(), //id del producto dentro del carrito
        express_validator_1.body("productId").isString().notEmpty(), express_validator_1.body("quantity").isString().notEmpty(), auth_validation_middleware_1.default.validJWTNeeded, //valida jwt
        carts_middleware_1.default.validateProductIdinCart, //valida que el _id este en el carrito
        carts_middleware_1.default.validateProductQuantityinCart, //valida que la cantidad ingresada no sea mayor a la que hay en el carrito ni sea menor o igual a 0
        carts_middleware_1.default.validateProductId, //valida que productId pertenzca a un producto de la coleccion Products
        carts_controller_1.default.removeProducts //elimina o resta cantidad del producto del carrito y suma el stock
        );
        this.app
            .route("/cart/submit")
            .post(auth_validation_middleware_1.default.validJWTNeeded, //valida JWT
        carts_middleware_1.default.validateEmpyCart, //valida que el carrito no este vacio
        carts_middleware_1.default.validateProductsinCart, //valida que los ids de productos del carrito pertenezcan a la coleccion de Products
        carts_controller_1.default.createOrder);
        return this.app;
    }
}
exports.CartsRoutes = CartsRoutes;
//# sourceMappingURL=carts.routes.config.js.map