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
      return res.status(400).send({
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
      return res.status(401).send({
        errors: [{ msg: `The email < ${req.body.email} > is not registered` }],
      });
    } else {
      next();
    }
  }

  async isSecurePassword(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (
      !req.body.password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/
      )
    ) {
      return res.status(400).send({
        errors: [
          {
            msg: `The password must be Minimum 8 characters, Maximum 15, At least one capital letter, At least one minute letter, At least one digit, No blanks, At least 1 special character`,
          },
        ],
      });
    }
    next();
  }

  async validateUserPassword(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await UsersService.getUserByEmail(req.body.email);
    const match = bcrypt.compareSync(req.body.password, user!.password);
    if (!match) {
      return res.status(401).send({
        errors: [{ msg: "the password entered is incorrect" }],
      });
    }
    next();
  }

  async validateSameEmailDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await UsersService.getUserByEmail(req.body.email);
    if (user) {
      return res.status(400).send({
        errors: [{ msg: "the email is already registered" }],
      });
    }
    next();
  }

  async validatePhone(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (
      !req.body.phone.match(
        /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/
      )
    ) {
      return res.status(400).send({
        errors: [{ msg: "invalid cell phone format" }],
      });
    }
    next();
  }
}

export default new UsersMiddleware();
