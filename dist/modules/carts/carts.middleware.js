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
const products_service_1 = __importDefault(require("../products/products.service"));
const carts_service_1 = __importDefault(require("../carts/carts.service"));
class CartsMiddleware {
    validateObjectid(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body.productId.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(400).send({
                    errors: [{ msg: `not an objectid` }],
                });
            }
            next();
        });
    }
    validateProductId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield products_service_1.default.getProductById(req.body.productId);
            if (!product) {
                return res.status(400).send({
                    errors: [
                        {
                            msg: `the id does not belong to any product`,
                        },
                    ],
                });
            }
            next();
        });
    }
    validateProductIdinCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield carts_service_1.default.getCart(req.jwt.userId);
            const found = cart.products.find((element) => element._id == req.body._id);
            if (!found) {
                return res.status(400).send({
                    errors: [
                        {
                            msg: `does not exist in the cart`,
                        },
                    ],
                });
            }
            next();
        });
    }
    validateProductQuantity(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield products_service_1.default.getProductById(req.body.productId);
            if (product.stock < req.body.quantity) {
                return res.status(400).send({
                    errors: [
                        {
                            msg: `there is no stock of the product`,
                        },
                    ],
                });
            }
            next();
        });
    }
    validateProductQuantityinCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield carts_service_1.default.getCart(req.jwt.userId);
            const found = cart.products.find((element) => element._id == req.body._id);
            if (found.quantity < req.body.quantity || req.body.quantity <= 0) {
                return res.status(400).send({
                    errors: [
                        {
                            msg: `Incorrect quantity. there are ${found.quantity} in the cart`,
                        },
                    ],
                });
            }
            next();
        });
    }
    validateEmpyCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield carts_service_1.default.getCart(req.jwt.userId);
            if (cart.products.length == 0) {
                return res.status(400).send({
                    errors: [
                        {
                            msg: `There are no products in the cart`,
                        },
                    ],
                });
            }
            next();
        });
    }
    validateProductsinCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield carts_service_1.default.getCart(req.jwt.userId);
            for (let i = 0; i < cart.products.length; i++) {
                const product = yield products_service_1.default.getProductById(cart.products[i].productId);
                if (!product) {
                    return res.status(400).send({
                        errors: [
                            {
                                msg: `the id ${cart.products[i].productId} does not belong to any product`,
                            },
                        ],
                    });
                }
            }
            next();
        });
    }
    //No se valida antes de crear la orden porque ya lo habia descontado del stock del producto
    validateProductsInCartQuantity(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield carts_service_1.default.getCart(req.jwt.userId);
            for (let i = 0; i < cart.products.length; i++) {
                const product = yield products_service_1.default.getProductById(cart.products[i].productId);
                if (product.stock < req.body.products[i].quantity) {
                    return res.status(400).send({
                        errors: [
                            {
                                msg: `there is no stock of the product with id ${cart.products[i].productId}`,
                            },
                        ],
                    });
                }
            }
            next();
        });
    }
}
exports.default = new CartsMiddleware();
//para varios ID
/* async validateObjectsid(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  for (let i = 0; i < req.body.products.length; i++) {
    if (!req.body.products[i]._id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send({
        errors: [{ msg: `${req.body.products[i]._id} not an objectid` }],
      });
    }
  }
  next();
}

async validateProductId(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  for (let i = 0; i < req.body.products.length; i++) {
    const product: any = await ProductsService.getProductById(
      req.body.products[i]._id
    );
    if (!product) {
      return res.status(400).send({
        errors: [
          {
            msg: `the id ${req.body.products[i]._id} does not belong to any product`,
          },
        ],
      });
    }
  }
  next();
}



} */
//# sourceMappingURL=carts.middleware.js.map