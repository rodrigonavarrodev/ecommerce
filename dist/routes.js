"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_routes_config_1 = require("./modules/users/users.routes.config");
const products_routes_config_1 = require("./modules/products/products.routes.config");
const categories_routes_config_1 = require("./modules/categories/categories.routes.config");
const carts_routes_config_1 = require("./modules/carts/carts.routes.config");
const orders_routes_config_1 = require("./modules/orders/orders.routes.config");
const images_routes_config_1 = require("./modules/images/images.routes.config");
const debug_1 = __importDefault(require("debug"));
const debugLog = debug_1.default("app:routes");
class Router {
    static init(app) {
        debugLog("Router - Start adding routes.");
        const routes = [];
        //llamado a las rutas
        routes.push(new images_routes_config_1.ImagesRoutes(app));
        routes.push(new orders_routes_config_1.OrdersRoutes(app));
        routes.push(new carts_routes_config_1.CartsRoutes(app));
        routes.push(new categories_routes_config_1.CategoriesRoutes(app));
        routes.push(new products_routes_config_1.ProductsRoutes(app));
        routes.push(new users_routes_config_1.UsersRoutes(app));
        routes.forEach((route) => {
            debugLog(`Routes configured for ${route.getName()}`);
        });
        return routes;
    }
}
exports.default = Router;
//# sourceMappingURL=routes.js.map