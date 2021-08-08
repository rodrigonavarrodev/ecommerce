import express from "express";
import debug from "debug";
import CategoriesService from "./categories.service";

const log: debug.IDebugger = debug("app:products-controller");

class CategoriesController {
  async getAllCategories(req: express.Request, res: express.Response) {
    try {
      const categories = await CategoriesService.getAll();
      return res
        .status(200)
        .send({ msg: "Successful response", data: categories });
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }

  async getCategoryById(req: express.Request, res: express.Response) {
    try {
      const category = await CategoriesService.getCategoryById(
        req.params.categoryId
      );
      return res
        .status(200)
        .send({ msg: "Successful response", data: category });
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }

  async createCategory(req: express.Request, res: express.Response) {
    try {
      const category = await CategoriesService.createCategory(req.body);
      return res
        .status(201)
        .send({ msg: "Successful created", data: category });
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }

  async updateCategory(req: express.Request, res: express.Response) {
    try {
      const category = await CategoriesService.updateCategory(
        req.params.categoryId,
        req.body
      );
      return res
        .status(201)
        .send({ msg: "Successful updated", data: category });
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }

  async deleteCategory(req: express.Request, res: express.Response) {
    try {
      const category = await CategoriesService.deleteCategory(
        req.params.categoryId      );
      return res
        .status(201)
        .send({ msg: "Successful deleted", data: category });
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }
}
export default new CategoriesController();
