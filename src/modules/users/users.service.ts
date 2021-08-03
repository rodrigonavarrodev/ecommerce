import { CRUD } from "../../common/interfaces/crud.interface";
import debug from "debug";
import UsersDao from "./users.dao";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config/config";
import CartsService from "../carts/carts.service";

const log: debug.IDebugger = debug("app:users-service");

class UsersService implements CRUD {
  async createUser(resource: UsersModel.registerUser) {
    resource.password = this.hash(resource.password);
    const newUser = await UsersDao.addUser(resource);
    //creo el carrito del usuario
    await this.createCart(newUser.id);
    return { ...this.userDetails(newUser) };
  }

  hash(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  generateJwtToken(resource: any) {
    return jwt.sign(
      {
        userId: resource.id,
      },
      config.secret!,
      { expiresIn: config.tokenExpires }
    );
  }

  async getUserByEmail(email: string) {
    return UsersDao.getUserByEmail(email);
  }

  async login(resource: UsersModel.loginUser) {
    const user = await UsersDao.getUserByEmail(resource.email);
    const jwtToken = this.generateJwtToken(user);
    return { ...this.userDetails(user), jwtToken };
  }

  async getUserById(id: string) {
    const user = await UsersDao.getUserById(id);
    if (!user) return null;
    return { ...this.userDetails(user) };
  }

  async getUserRoleById(id: string) {
    return UsersDao.getUserById(id);
  }

  async createCart(userId: string) {
    return CartsService.createCart(userId);
  }

  userDetails(user: any) {
    const {
      id,
      email,
      firstname,
      lastname,
      phone,
      address,
      apartment,
      city,
      postalCode,
    } = user;
    return {
      id,
      email,
      firstname,
      lastname,
      phone,
      address,
      apartment,
      city,
      postalCode,
    };
  }
}

export default new UsersService();
