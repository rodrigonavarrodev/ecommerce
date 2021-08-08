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
const orders_dao_1 = __importDefault(require("./orders.dao"));
const users_service_1 = __importDefault(require("../users/users.service"));
const log = debug_1.default("app:products-service");
class OrdersService {
    createOrder(userId, products) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_service_1.default.getUserById(userId);
            const delivery = `${user === null || user === void 0 ? void 0 : user.address} ${(user === null || user === void 0 ? void 0 : user.apartment) || ''} ${user === null || user === void 0 ? void 0 : user.city} (${user === null || user === void 0 ? void 0 : user.postalCode})`;
            let totalPrice = 0;
            products.map((x) => totalPrice += x.productId.price);
            return orders_dao_1.default.createOrder(userId, products, totalPrice, delivery);
        });
    }
    getOrders(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return orders_dao_1.default.getOrdersByUser(userId);
        });
    }
    getOrderById(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return orders_dao_1.default.getOrderById(orderId);
        });
    }
    completeOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            let status = "Finalized";
            return orders_dao_1.default.completeOrder(orderId, status);
        });
    }
}
exports.default = new OrdersService();
//# sourceMappingURL=orders.service.js.map