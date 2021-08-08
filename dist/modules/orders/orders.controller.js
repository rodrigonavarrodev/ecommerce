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
const orders_service_1 = __importDefault(require("./orders.service"));
const mails_service_1 = __importDefault(require("../../common/services/mails/mails.service"));
const users_service_1 = __importDefault(require("../users/users.service"));
const log = debug_1.default("app:orders-controller");
class OrdersController {
    getOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield orders_service_1.default.getOrders(req.jwt.userId);
                return res
                    .status(200)
                    .send({ msg: "Successful response", data: orders });
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
    getOrderById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield orders_service_1.default.getOrderById(req.params.orderId);
                return res
                    .status(200)
                    .send({ msg: "Successful response", data: order });
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
    completeOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield orders_service_1.default.completeOrder(req.body.orderId);
                const user = yield users_service_1.default.getUserById(req.jwt.userId);
                const options = {
                    from: "Ecommerce Coder",
                    to: `${user === null || user === void 0 ? void 0 : user.email}`,
                    subject: "Tu orden fue completada correctamente",
                    html: `<h4>${order}</h4>`,
                };
                yield mails_service_1.default.sendMail(options);
                return res
                    .status(200)
                    .send({ msg: "Successful response", data: order });
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
exports.default = new OrdersController();
//# sourceMappingURL=orders.controller.js.map