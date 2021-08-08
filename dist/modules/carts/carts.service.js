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
const carts_dao_1 = __importDefault(require("./carts.dao"));
const log = debug_1.default("app:products-service");
class CartsService {
    getCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return carts_dao_1.default.getCart(userId);
        });
    }
    createCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return carts_dao_1.default.createCart(userId);
        });
    }
    addProducts(userId, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield carts_dao_1.default.getCart(userId);
            let products = cart === null || cart === void 0 ? void 0 : cart.products;
            products.push(resource);
            return carts_dao_1.default.addProducts(userId, products);
        });
    }
    removeProducts(userId, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield carts_dao_1.default.getCart(userId);
            let products = cart === null || cart === void 0 ? void 0 : cart.products;
            const found = products.find((element) => element._id == resource._id);
            if (found.quantity - resource.quantity == 0) {
                let index = products.indexOf(found);
                products.splice(index, 1);
            }
            found.quantity = found.quantity - resource.quantity;
            console.log(products);
            return carts_dao_1.default.addProducts(userId, products);
        });
    }
    emptyCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield carts_dao_1.default.getCart(userId);
            let products = cart === null || cart === void 0 ? void 0 : cart.products;
            products = new Array();
            return carts_dao_1.default.addProducts(userId, products);
        });
    }
}
exports.default = new CartsService();
//# sourceMappingURL=carts.service.js.map