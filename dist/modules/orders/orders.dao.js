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
const log = debug_1.default("app:orders-dao");
class OrdersDao {
    constructor() {
        this.Schema = mongoose_service_1.default.getMongoose().Schema;
        this.OrdersSchema = new this.Schema({
            userId: { type: Schema.Types.ObjectId, ref: "Users" },
            products: [
                {
                    productId: { type: Schema.Types.ObjectId, ref: "Products" },
                    quantity: Number,
                    price: Number,
                },
            ],
            status: {
                type: String,
                enum: ["Generated", "Finalized" /* "On the way", "Paid" */],
                default: "Generated",
            },
            total: Number,
            delivery: String
        }, { timestamps: true });
        this.Order = mongoose_service_1.default
            .getMongoose()
            .model("Orders", this.OrdersSchema);
        log("Created new instance of StatesDao");
    }
    createOrder(userId, products, totalPrice, delivery) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = new this.Order({
                userId: userId,
                products: products,
                total: totalPrice,
                delivery: delivery
            });
            yield order.save();
            return order;
        });
    }
    getOrdersByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Order.find({ userId }).populate({
                path: "products",
                populate: {
                    path: "productId",
                    select: "name description price",
                },
            });
        });
    }
    getOrderById(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Order.findById(orderId).populate({
                path: "products",
                populate: {
                    path: "productId",
                    select: "name description price",
                },
            });
        });
    }
    completeOrder(orderId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.Order.findByIdAndUpdate({ _id: orderId }, { $set: { status: status } }, { new: true });
            return this.getOrderById(orderId);
        });
    }
}
exports.default = new OrdersDao();
//# sourceMappingURL=orders.dao.js.map