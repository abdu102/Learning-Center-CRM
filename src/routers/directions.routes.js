import { Router } from "express";
import { directionsController } from "../controllers/directions.controller.js";
import { checkToken } from "../middlewares/check_token.js";
import { directionValidation } from "../middlewares/validation/direction.joi.js";
export const directionsRouter = Router();
directionsRouter.post('/', checkToken, directionValidation, directionsController.POST).put('/:id', checkToken,  directionValidation ,directionsController.PUT).delete('/:id', checkToken ,directionsController.DELETE)
