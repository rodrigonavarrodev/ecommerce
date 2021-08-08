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
const carts_service_1 = __importDefault(require("./carts.service"));
const products_service_1 = __importDefault(require("../products/products.service"));
const orders_service_1 = __importDefault(require("../orders/orders.service"));
const mails_service_1 = __importDefault(require("../../common/services/mails/mails.service"));
const users_service_1 = __importDefault(require("../users/users.service"));
const log = debug_1.default("app:products-controller");
class CartsController {
    getCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield carts_service_1.default.getCart(req.jwt.userId);
                return res
                    .status(200)
                    .send({ msg: "Successful response", data: cart });
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
    addProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield carts_service_1.default.addProducts(req.jwt.userId, req.body);
                yield products_service_1.default.subtractProductStock(req.body); //resto stock en el producto
                return res
                    .status(200)
                    .send({ msg: "Successful response", data: cart });
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
    removeProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield carts_service_1.default.removeProducts(req.jwt.userId, req.body);
                yield products_service_1.default.addProductStock(req.body); //sumo stock en el producto
                return res
                    .status(200)
                    .send({ msg: "Successful response", data: cart });
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
    createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield carts_service_1.default.getCart(req.jwt.userId);
                const order = yield orders_service_1.default.createOrder(req.jwt.userId, cart.products);
                const user = yield users_service_1.default.getUserById(req.jwt.userId);
                const options = {
                    from: "Ecommerce Coder",
                    to: `${user === null || user === void 0 ? void 0 : user.email}`,
                    subject: "Tu orden fue generada correctamente",
                    html: `<h4>${order}</h4>`,
                };
                yield mails_service_1.default.sendMail(options);
                yield carts_service_1.default.emptyCart(req.jwt.userId); //vacio el carrito
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
exports.default = new CartsController();
//# sourceMappingURL=carts.controller.js.map