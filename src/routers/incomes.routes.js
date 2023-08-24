import { Router } from "express";
import { financeController } from "../controllers/finance.controller.js";
import { checkToken, educationToken } from "../middlewares/check_token.js";
export const incomesRouter = Router();
incomesRouter.get('/', financeController.GET_INCOMES).post('/',financeController.POST_INCOMES).put('/:id', financeController.UPDATE_INCOMES)
