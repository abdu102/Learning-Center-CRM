import { Router } from "express";
import { positionsController } from "../controllers/positions.controller.js";
import { checkToken } from "../middlewares/check_token.js";
export const positionsRouter = Router();
positionsRouter.post('/', checkToken, positionsController.POST).put('/:id', checkToken, positionsController.PUT).delete('/:id', checkToken, positionsController.DELETE)
