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
          }
        }
      } catch (err) {
        return res.status(403).send({ msg: "Invalid Token" });
      }
    } else {
      return res.status(401).send({ msg: "Unauthorized" });
    }
  }

  async isAdmin(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const user = await UsersService.getUserRoleById(req.jwt.userId);
      if (user?.admin === true) {
        next();
      } else {
        return res.status(401).send({ msg: "Unauthorized" });
      }
    } catch (error) {
      console.log(error);
      return res.status(403).send({ msg: "Error" });
    }
  }
}

export default new AuthValidationMiddleware();
