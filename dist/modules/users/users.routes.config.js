"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
const common_routes_config_1 = require("../../common/common.routes.config");
const body_validation_middleware_1 = __importDefault(require("../../common/middleware/body.validation.middleware"));
const auth_validation_middleware_1 = __importDefault(require("../../common/middleware/auth.validation.middleware"));
const users_middleware_1 = __importDefault(require("./users.middleware"));
const users_controller_1 = __importDefault(require("./users.controller"));
const express_validator_1 = require("express-validator");
class UsersRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "UsersRoutes");
    }
    configureRoutes() {
        this.app.route("/users/register").post(express_validator_1.body("email").isEmail().notEmpty(), express_validator_1.body("password").isString().notEmpty(), express_validator_1.body("confirmpassword").isString().notEmpty(), express_validator_1.body("firstname").isString().notEmpty(), express_validator_1.body("lastname").isString().notEmpty(), express_validator_1.body("phone").isString().notEmpty(), express_validator_1.body("admin").isBoolean().optional(), //es optional, por defecto va en false
        express_validator_1.body("address").isString().notEmpty(), express_validator_1.body("apartment").isString().optional(), express_validator_1.body("city").isString().notEmpty(), express_validator_1.body("postalCode").isString().notEmpty(), body_validation_middleware_1.default.verifyBodyFieldsErrors, users_middleware_1.default.validateSameEmailDoesntExist, //verifica que el email ingresado ya exista
        users_middleware_1.default.isSecurePassword, //verifica que la contraseña sea segura
        users_middleware_1.default.validatePhone, //verifica que el formato de telefono sea correcto
        users_middleware_1.default.validatePassword, //verifica que las 2 contraseñas sean iguales
        users_controller_1.default.register //registra el nuevo usuario y crea un carrito vacio
        );
        this.app.route("/users/login").post(express_validator_1.body("email").isEmail().notEmpty(), express_validator_1.body("password").isString().notEmpty(), body_validation_middleware_1.default.verifyBodyFieldsErrors, users_middleware_1.default.validateEmailExists, //verifica que sea un email registrado
        users_middleware_1.default.validateUserPassword, //verifica la contraseña
        users_controller_1.default.login //se loguea y devuelve token
        );
        this.app.route("/users/info").get(auth_validation_middleware_1.default.validJWTNeeded, //valida JWT
        users_controller_1.default.getUserInfo);
        return this.app;
    }
}
exports.UsersRoutes = UsersRoutes;
//# sourceMappingURL=users.routes.config.js.map