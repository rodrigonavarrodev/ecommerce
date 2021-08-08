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
const categories_service_1 = __importDefault(require("./categories.service"));
class CategoriesMiddleware {
    validateObjectid(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params.categoryId);
            console.log('entre');
            if (!req.params.categoryId.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(400).send({
                    errors: [{ msg: "not an objectid" }],
                });
            }
            next();
        });
    }
    validateCategoryId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield categories_service_1.default.getCategoryById(req.params.categoryId);
            if (!category) {
                return res.status(400).send({
                    errors: [{ msg: "the id does not belong to any category" }],
                });
            }
            next();
        });
    }
    verifyCategoryExists(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield categories_service_1.default.findByName(req.body.name);
            if (category) {
                return res.status(400).send({
                    errors: [{ msg: "the category already exists" }],
                });
            }
            next();
        });
    }
}
exports.default = new CategoriesMiddleware();
//# sourceMappingURL=categories.middleware.js.map