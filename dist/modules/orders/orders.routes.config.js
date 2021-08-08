"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersRoutes = void 0;
const common_routes_config_1 = require("../../common/common.routes.config");
const express_validator_1 = require("express-validator");
const body_validation_middleware_1 = __importDefault(require("../../common/middleware/body.validation.middleware"));
const orders_controller_1 = __importDefault(require("./orders.controller"));
const auth_validation_middleware_1 = __importDefault(require("../../common/middleware/auth.validation.middleware"));
const orders_middleware_1 = __importDefault(require("./orders.middleware"));
class OrdersRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "OrderssRoutes");
    }
    configureRoutes() {
        this.app
            .route("/orders")
            .get(auth_validation_middleware_1.default.validJWTNeeded, orders_controller_1.default.getOrders);
        this.app
            .route("/orders/:orderId")
            .get(auth_validation_middleware_1.default.validJWTNeeded, orders_middleware_1.default.validateObjectid, orders_middleware_1.default.validateOrderId, orders_controller_1.default.getOrderById);
        this.app
            .route("/orders/complete")
            .post(express_validator_1.body("orderId").isString().notEmpty(), body_validation_middleware_1.default.verifyBodyFieldsErrors, auth_validation_middleware_1.default.validJWTNeeded, auth_validation_middleware_1.default.isAdmin, orders_middleware_1.default.validateOrderMongoId, orders_middleware_1.default.validateOrderId, orders_middleware_1.default.vericateIsGeneratedOrder, orders_controller_1.default.completeOrder);
        return this.app;
    }
}
exports.OrdersRoutes = OrdersRoutes;
//# sourceMappingURL=orders.routes.config.js.map