/* import io from "../../../init";
import jwt from "jsonwebtoken";
import config from "../../../config/config";
import { Jwt } from "../../../common/types/jwt";
import UsersService from "../../../modules/users/users.service";
import ProductsService from "../../../modules/products/products.service";
import OrdersService from "../../../modules/orders/orders.service";
import CartsService from "../../../modules/carts/carts.service";

io.on("connection", (socket) => {
  socket.on("entrarAlChat", (usuario) => {
    console.log(`usuario conectado ${usuario.id}`);
    //io.emit("servidor", { info: "de nuevo" });
  });

  socket.on("mensaje", async (client) => {
    if (
      !client.token.match(/^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/)
    ) {
      return io
        .to(client.id)
        .emit("resp-message", { info: "ingresa un token correcto" });
    }
    const jwtUser: any = jwt.verify(client.token, config.secret!);
    const validUser = await UsersService.getUserById(jwtUser.userId);
    if (!validUser) {
      return io
        .to(client.id)
        .emit("resp-message", {
          info: "el token no pertenece a ningun usuario registrado",
        });
    }
    if (client.mensaje === "Stock") {
      const products = await ProductsService.getAll();
      const response = new Array();
      products.map((x) => {
        const stock = {
          producto: x.name,
          stock: x.stock,
        };
        response.push(stock);
      });
      return io.to(client.id).emit("resp-message", { info: response });
    }

    if (client.mensaje === "Orden") {
      const order = await OrdersService.getOrderById(validUser.id);
      if (!order) {
        return io
          .to(client.id)
          .emit("resp-message", { info: "No tenes ordenes activas" });
      }
      return io.to(client.id).emit("resp-message", { info: order });
    }

    if (client.mensaje === "Carrito") {
      const cart = await CartsService.getCart(validUser.id);
      if (!cart) {
        return io
          .to(client.id)
          .emit("resp-message", { info: "No existe el carrito" });
      }
      return io.to(client.id).emit("resp-message", { info: cart });
    } else {
      return io
        .to(client.id)
        .emit("resp-message", {
          info: 'No se ha podido comprender tu mensaje. Por favor ingresa alguna de las siguientes opciones. "Stock": para conocer nuestro stock actual; "Orden": para conocer informacion de la ultima orden, "Carrito": para conocer el estado actual de tu carrito',
        });
    }
  });
});



 */