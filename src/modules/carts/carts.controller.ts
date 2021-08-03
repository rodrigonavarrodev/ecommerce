import express from "express";
import debug from "debug";
import CartsService from "./carts.service";
import ProductsService from "../products/products.service";
import OrdersService from "../orders/orders.service";
import MailsService from "../../common/services/mails/mails.service";
import UsersService from "../users/users.service";

const log: debug.IDebugger = debug("app:products-controller");

class CartsController {
  async getCart(req: express.Request, res: express.Response) {
    try {
      const cart = await CartsService.getCart(req.jwt.userId);
      return res
        .status(200)
        .send({ msg: "Successful response", data: cart });
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }

  async addProducts(req: express.Request, res: express.Response) {
    try {
      const cart = await CartsService.addProducts(req.jwt.userId, req.body);
      await ProductsService.subtractProductStock(req.body) //resto stock en el producto
      return res
        .status(200)
        .send({ msg: "Successful response", data: cart });
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }

  async removeProducts(req: express.Request, res: express.Response) {
    try {
      const cart = await CartsService.removeProducts(req.jwt.userId, req.body);
      await ProductsService.addProductStock(req.body) //sumo stock en el producto
      return res
        .status(200)
        .send({ msg: "Successful response", data: cart });
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }

  async createOrder(req: express.Request, res: express.Response) {
    try {
      const cart: any = await CartsService.getCart(req.jwt.userId);
      const order = await OrdersService.createOrder(req.jwt.userId, cart.products)
      const user = await UsersService.getUserById(req.jwt.userId)
      const options = {
        from: "Ecommerce Coder",
        to: `${user?.email}`,
        subject: "Tu orden fue generada correctamente",
        html: `<h4>${order}</h4>`,
      }
      await MailsService.sendMail(options)
      await CartsService.emptyCart(req.jwt.userId) //vacio el carrito
      return res
        .status(200)
        .send({ msg: "Successful response", data: order });
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }

}

export default new CartsController();
