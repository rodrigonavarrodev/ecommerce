import { CommonRoutesConfig } from "./common/common.routes.config";
import { UsersRoutes } from "./modules/users/users.routes.config";
import { ProductsRoutes } from "./modules/products/products.routes.config";

import debug from "debug";

const debugLog: debug.IDebugger = debug("app:routes");

export default class Router {
  public static init(app: any): any {
    debugLog("Router - Start adding routes.");
    const routes: Array<CommonRoutesConfig> = [];

    routes.push(new ProductsRoutes(app));
    routes.push(new UsersRoutes(app));

    routes.forEach((route: CommonRoutesConfig) => {
      debugLog(`Routes configured for ${route.getName()}`);
    });

    return routes;
  }
}
