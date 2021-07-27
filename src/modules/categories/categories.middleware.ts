import express from "express";
import { ObjectId } from "mongodb";
import CategoriesService from "./categories.service";

class CategoriesMiddleware {

  async validateObjectid(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    console.log(req.params.categoryId);
    console.log('entre');
    
    
    if (!req.params.categoryId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send({
        errors: [{ msg: "not an objectid" }],
      });
    }
    next();
  }

  async validateCategoryId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const category: any = await CategoriesService.getCategoryById(
      req.params.categoryId
    );
    if (!category) {
      return res.status(400).send({
        errors: [{ msg: "the id does not belong to any category" }],
      });
    }
    next();
  }

  async verifyCategoryExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const category = await CategoriesService.findByName(req.body.name)
    if (category) {
      return res.status(400).send({
        errors: [{ msg: "the category already exists" }],
      });
    }
    next()
  }
}

export default new CategoriesMiddleware();
