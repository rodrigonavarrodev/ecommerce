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
const mongoose_service_1 = __importDefault(require("../../common/services/mongoose.service"));
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const debug_1 = __importDefault(require("debug"));
const log = debug_1.default("app:products-dao");
class ProductsDao {
    constructor() {
        this.Schema = mongoose_service_1.default.getMongoose().Schema;
        this.ProductsSchema = new this.Schema({
            name: String,
            description: String,
            category: { type: Schema.Types.ObjectId, ref: "Categories" },
            price: Number,
            stock: Number,
            images: [{ type: Schema.Types.ObjectId, default: [], ref: "Images" }],
        }, { timestamps: true });
        this.Product = mongoose_service_1.default
            .getMongoose()
            .model("Products", this.ProductsSchema);
        log("Created new instance of StatesDao");
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Product.find().populate("category").populate("images");
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Product.findById(id).populate("category").populate("images");
        });
    }
    create(productFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = new this.Product(Object.assign({}, productFields));
            yield product.save();
            return product;
        });
    }
    getAllByCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(categoryId);
            return this.Product.find({ category: categoryId });
        });
    }
    updateStock(productId, stock) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Product.findOneAndUpdate({ _id: productId }, { $set: { stock: stock } }, { new: true });
        });
    }
    updateProductsImages(productId, images) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Product.findOneAndUpdate({ _id: productId }, { $set: { images: images } }, { new: true });
        });
    }
    updateProduct(productId, productFields) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.Product.findByIdAndUpdate({ _id: productId }, { $set: Object.assign({}, productFields) }, { new: true });
            return this.Product.findById(productId)
                .populate("category")
                .populate("images");
        });
    }
    deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.Product.findByIdAndDelete(productId);
        });
    }
}
exports.default = new ProductsDao();
//# sourceMappingURL=products.dao.js.map