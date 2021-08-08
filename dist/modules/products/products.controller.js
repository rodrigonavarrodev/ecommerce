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
const products_service_1 = __importDefault(require("./products.service"));
const log = debug_1.default("app:products-controller");
class ProductsController {
    getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield products_service_1.default.getAll();
                return res
                    .status(200)
                    .send({ msg: "Successful response", data: products });
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
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield products_service_1.default.getProductById(req.params.productId);
                return res
                    .status(200)
                    .send({ msg: "Successful response", data: product });
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
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield products_service_1.default.createProduct(req.body);
                return res.status(201).send({ msg: "Successful created", data: product });
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
    getProductsByCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield products_service_1.default.getProductsByCategory(req.params.categoryId);
                return res
                    .status(200)
                    .send({ msg: "Successful response", data: products });
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
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield products_service_1.default.updateProduct(req.params.productId, req.body);
                return res
                    .status(200)
                    .send({ msg: "Successful response", data: product });
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
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield products_service_1.default.deleteProduct(req.params.productId);
                return res
                    .status(200)
                    .send({ msg: "Successful deleted" });
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
exports.default = new ProductsController();
//# sourceMappingURL=products.controller.js.map