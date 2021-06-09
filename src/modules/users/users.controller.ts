import express from "express";

import debug from "debug";
import UsersService from "./users.service";

const log: debug.IDebugger = debug("app:users-controller");

class UsersController {
  async register(req: express.Request, res: express.Response) {
    try {
      await UsersService.createUser(req.body);
      return res.status(201).send({ msg: "Successful registration" });
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }

  async login(req: express.Request, res: express.Response) {
    try {
      const user = await UsersService.login(req.body);
      return res.status(200).send( user );
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }
}

export default new UsersController();
