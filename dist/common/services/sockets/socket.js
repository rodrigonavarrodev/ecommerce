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
const init_1 = __importDefault(require("../../../init"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config/config"));
const users_service_1 = __importDefault(require("../../../modules/users/users.service"));
const products_service_1 = __importDefault(require("../../../modules/products/products.service"));
const orders_service_1 = __importDefault(require("../../../modules/orders/orders.service"));
const carts_service_1 = __importDefault(require("../../../modules/carts/carts.service"));
init_1.default.on("connection", (socket) => {
    socket.on("entrarAlChat", (usuario) => {
        console.log(`usuario conectado ${usuario.id}`);
        //io.emit("servidor", { info: "de nuevo" });
    });
    socket.on("mensaje", (client) => __awaiter(void 0, void 0, void 0, function* () {
        if (!client.token.match(/^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/)) {
            return init_1.default
                .to(client.id)
                .emit("resp-message", { info: "ingresa un token correcto" });
        }
        const jwtUser = jsonwebtoken_1.default.verify(client.token, config_1.default.secret);
        const validUser = yield users_service_1.default.getUserById(jwtUser.userId);
        if (!validUser) {
            return init_1.default
                .to(client.id)
                .emit("resp-message", {
                info: "el token no pertenece a ningun usuario registrado",
            });
        }
        if (client.mensaje === "Stock") {
            const products = yield products_service_1.default.getAll();
            const response = new Array();
            products.map((x) => {
                const stock = {
                    producto: x.name,
                    stock: x.stock,
                };
                response.push(stock);
            });
            return init_1.default.to(client.id).emit("resp-message", { info: response });
        }
        if (client.mensaje === "Orden") {
            const order = yield orders_service_1.default.getOrderById(validUser.id);
            if (!order) {
                return init_1.default
                    .to(client.id)
                    .emit("resp-message", { info: "No tenes ordenes activas" });
            }
            return init_1.default.to(client.id).emit("resp-message", { info: order });
        }
        if (client.mensaje === "Carrito") {
            const cart = yield carts_service_1.default.getCart(validUser.id);
            if (!cart) {
                return init_1.default
                    .to(client.id)
                    .emit("resp-message", { info: "No existe el carrito" });
            }
            return init_1.default.to(client.id).emit("resp-message", { info: cart });
        }
        else {
            return init_1.default
                .to(client.id)
                .emit("resp-message", {
                info: 'No se ha podido comprender tu mensaje. Por favor ingresa alguna de las siguientes opciones. "Stock": para conocer nuestro stock actual; "Orden": para conocer informacion de la ultima orden, "Carrito": para conocer el estado actual de tu carrito',
            });
        }
    }));
});
//# sourceMappingURL=socket.js.map