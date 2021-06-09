import express from "express";
import bcrypt from "bcrypt";
import UsersService from "./users.service";

class UsersMiddleware {
  async validatePassword(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body.confirmpassword != req.body.password) {
      res.status(400).send({
        errors: [{ msg: "Passwords do not match" }],
      });
    } else {
      next();
    }
  }

  async validateEmailExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await UsersService.getUserByEmail(req.body.email);
    if (!user) {
      res.status(400).send({
        errors: [{ msg: `The tmail < ${req.body.email} > is not registered` }],
      });
    } else {
      next();
    }
  }

  async validateUserPassword(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await UsersService.getUserByEmail(req.body.email);
    const match = bcrypt.compareSync(req.body.password, user!.password);
    if (!match) {
      res.status(400).send({
        errors: [{ msg: "the password entered is incorrect" }],
      });
    } else {
      next();
    }
  }
}

export default new UsersMiddleware();
