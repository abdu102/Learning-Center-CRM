import { Router } from "express";
import { financeController } from "../controllers/finance.controller.js";
export const outlaysRouter = Router();
outlaysRouter.get('/', financeController.GET_OUTLAYS).post('/',financeController.POST_OUTLAYS).put('/:id', financeController.UPDATE_OUTLAYS)
