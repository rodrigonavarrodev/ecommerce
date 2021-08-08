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
const categories_dao_1 = __importDefault(require("./categories.dao"));
const log = debug_1.default("app:products-service");
class CategoriesService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return categories_dao_1.default.getAll();
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return categories_dao_1.default.findByName(name);
        });
    }
    getCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return categories_dao_1.default.getById(id);
        });
    }
    createCategory(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield categories_dao_1.default.create(resource);
            return Object.assign({}, this.categoryDetails(category));
        });
    }
    categoryDetails(product) {
        const { id, name } = product;
        return {
            id,
            name,
        };
    }
    updateCategory(id, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield categories_dao_1.default.update(id, resource);
            return Object.assign({}, this.categoryDetails(category));
        });
    }
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield categories_dao_1.default.delete(id);
            return Object.assign({}, this.categoryDetails(category));
        });
    }
}
exports.default = new CategoriesService();
//# sourceMappingURL=categories.service.js.map