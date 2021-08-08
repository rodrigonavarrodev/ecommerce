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
const log = debug_1.default("app:carts-dao");
class CartsDao {
    constructor() {
        this.Schema = mongoose_service_1.default.getMongoose().Schema;
        this.CartsSchema = new this.Schema({
            userId: { type: Schema.Types.ObjectId, ref: "Users" },
            products: [
                { productId: { type: Schema.Types.ObjectId, ref: "Products" }, quantity: Number }
            ],
        }, { timestamps: true });
        this.Cart = mongoose_service_1.default.getMongoose().model("Carts", this.CartsSchema);
        log("Created new instance of StatesDao");
    }
    getCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Cart.findOne({ userId }).populate({
                path: "products",
                populate: {
                    path: "productId", select: "name description price"
                },
            });
            ;
        });
    }
    createCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = new this.Cart({ userId: userId, products: [] });
            yield cart.save();
            return cart;
        });
    }
    addProducts(userId, products) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.Cart.findOneAndUpdate({ userId: userId }, { $set: { products: products } }, { new: true });
            return cart;
        });
    }
}
exports.default = new CartsDao();
//# sourceMappingURL=carts.dao.js.map