import express from "express";
import jwt from "jsonwebtoken";
import config from "../../config/config";
import { Jwt } from "../../common/types/jwt";
import UsersService from "../../modules/users/users.service";

class AuthValidationMiddleware {
  async validJWTNeeded(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.headers["authorization"]) {
      try {
        const authorization = req.headers["authorization"].split(" ");
        if (authorization[0] !== "Bearer") {
          return res.status(401).send();
        } else {
          const jwtUser = jwt.verify(authorization[1], config.secret!) as Jwt;
          const validUser = await UsersService.getUserById(jwtUser.userId);
          if (validUser) {
            req.jwt = jwtUser;
            next();
          } else {
            return res.status(401).send({ msg: "Unauthorized" });
          }
        }
      } catch (err) {
        return res.status(403).send({ msg: "Invalid Token" });
      }
    } else {
      return res.status(401).send({ msg: "Unauthorized" });
    }
  }
}

export default new AuthValidationMiddleware();
