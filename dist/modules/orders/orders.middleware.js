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
const orders_service_1 = __importDefault(require("./orders.service"));
class OrdersMiddleware {
    validateObjectid(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.params.orderId.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(400).send({
                    errors: [{ msg: `not an objectid` }],
                });
            }
            next();
        });
    }
    validateOrderMongoId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body.orderId.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(400).send({
                    errors: [{ msg: `not an objectid` }],
                });
            }
            next();
        });
    }
    validateOrderId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield orders_service_1.default.getOrderById(req.params.orderId || req.body.orderId);
            if (!order) {
                return res.status(400).send({
                    errors: [{ msg: "the id does not belong to any order" }],
                });
            }
            next();
        });
    }
    vericateIsGeneratedOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield orders_service_1.default.getOrderById(req.body.orderId);
            if (order.status !== "Generated") {
                return res.status(400).send({
                    errors: [{ msg: "the order is not in generated state" }],
                });
            }
            next();
        });
    }
}
exports.default = new OrdersMiddleware();
//# sourceMappingURL=orders.middleware.js.map