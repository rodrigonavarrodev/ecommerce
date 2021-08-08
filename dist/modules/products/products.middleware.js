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
const categories_service_1 = __importDefault(require("../categories/categories.service"));
const products_service_1 = __importDefault(require("./products.service"));
class ProductsMiddleware {
    validateObjectid(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.params.productId.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(400).send({
                    errors: [{ msg: "not an objectid" }],
                });
            }
            next();
        });
    }
    validateProductId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield products_service_1.default.getProductById(req.params.productId);
            if (!product) {
                return res.status(400).send({
                    errors: [{ msg: "the id does not belong to any product" }],
                });
            }
            next();
        });
    }
    validateObjectIdCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body.category.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(400).send({
                    errors: [{ msg: "not an objectid" }],
                });
            }
            next();
        });
    }
    validateIdCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield categories_service_1.default.getCategoryById(req.body.category);
            if (!category) {
                return res.status(400).send({
                    errors: [{ msg: "wrong category id" }],
                });
            }
            next();
        });
    }
}
exports.default = new ProductsMiddleware();
//# sourceMappingURL=products.middleware.js.map