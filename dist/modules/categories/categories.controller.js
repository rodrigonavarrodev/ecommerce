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
const categories_service_1 = __importDefault(require("./categories.service"));
const log = debug_1.default("app:products-controller");
class CategoriesController {
    getAllCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield categories_service_1.default.getAll();
                return res
                    .status(200)
                    .send({ msg: "Successful response", data: categories });
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
    getCategoryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield categories_service_1.default.getCategoryById(req.params.categoryId);
                return res
                    .status(200)
                    .send({ msg: "Successful response", data: category });
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
    createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield categories_service_1.default.createCategory(req.body);
                return res
                    .status(201)
                    .send({ msg: "Successful created", data: category });
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
    updateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield categories_service_1.default.updateCategory(req.params.categoryId, req.body);
                return res
                    .status(201)
                    .send({ msg: "Successful updated", data: category });
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
    deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield categories_service_1.default.deleteCategory(req.params.categoryId);
                return res
                    .status(201)
                    .send({ msg: "Successful deleted", data: category });
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
exports.default = new CategoriesController();
//# sourceMappingURL=categories.controller.js.map