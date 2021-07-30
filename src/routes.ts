import { CommonRoutesConfig } from "./common/common.routes.config";
import { UsersRoutes } from "./modules/users/users.routes.config";
import { ProductsRoutes } from "./modules/products/products.routes.config";
import { CategoriesRoutes } from "./modules/categories/categories.routes.config"
import { CartsRoutes } from "./modules/carts/carts.routes.config";
import { OrdersRoutes } from "./modules/orders/orders.routes.config";

import debug from "debug";

const debugLog: debug.IDebugger = debug("app:routes");

export default class Router {
  public static init(app: any): any {
    debugLog("Router - Start adding routes.");
    const routes: Array<CommonRoutesConfig> = [];

    //llamado a las rutas
    routes.push(new OrdersRoutes(app));
    routes.push(new CartsRoutes(app));
    routes.push(new CategoriesRoutes(app));
    routes.push(new ProductsRoutes(app));
    routes.push(new UsersRoutes(app));

    routes.forEach((route: CommonRoutesConfig) => {
      debugLog(`Routes configured for ${route.getName()}`);
    });

    return routes;
  }
}
