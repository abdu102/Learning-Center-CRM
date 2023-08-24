import { Router } from "express";
import { checksController } from "../controllers/check.controller.js";
import { checkToken } from "../middlewares/check_token.js";
export const checksRouter = Router();
checksRouter.get('/', checksController.GET_CHECKS).get('/:id', checksController.GET_CHECKS_BYGROUP_ID).post('/', checksController.POST).put('/:id', checksController.PUT)
