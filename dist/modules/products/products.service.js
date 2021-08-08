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
const products_dao_1 = __importDefault(require("./products.dao"));
const log = debug_1.default("app:products-service");
class ProductsService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return products_dao_1.default.getAll();
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield products_dao_1.default.getById(id);
            if (!product) {
                return;
            }
            return Object.assign({}, this.productDetails(product));
        });
    }
    createProduct(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield products_dao_1.default.create(resource);
            return Object.assign({}, this.productDetails(product));
        });
    }
    getProductsByCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return products_dao_1.default.getAllByCategory(categoryId);
        });
    }
    subtractProductStock(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.getProductById(resource.productId);
            let stock = product.stock - resource.quantity;
            yield products_dao_1.default.updateStock(resource.productId, stock);
        });
    }
    addProductStock(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.getProductById(resource.productId);
            let stock = product.stock + resource.quantity;
            yield products_dao_1.default.updateStock(resource.productId, stock);
        });
    }
    deleteImageReference(productId, images) {
        return __awaiter(this, void 0, void 0, function* () {
            yield products_dao_1.default.updateProductsImages(productId, images);
        });
    }
    updateProduct(productId, resoruce) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield products_dao_1.default.updateProduct(productId, resoruce);
            return Object.assign({}, this.productDetails(product));
        });
    }
    deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return products_dao_1.default.deleteProduct(productId);
        });
    }
    productDetails(product) {
        const { id, name, category, price, stock, images } = product;
        return {
            id,
            name,
            category,
            price,
            stock,
            images,
        };
    }
}
exports.default = new ProductsService();
//# sourceMappingURL=products.service.js.map