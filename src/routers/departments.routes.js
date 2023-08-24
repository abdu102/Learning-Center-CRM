import { Router } from "express";
import { departmentsController } from "../controllers/department.controller.js";
import { directionsController } from "../controllers/directions.controller.js";
import { checkToken } from "../middlewares/check_token.js";
import { positionsController } from "../controllers/positions.controller.js";
export const departmentsRouter = Router();
departmentsRouter.get('/', checkToken, departmentsController.GET_DEPARTMENTS).post('/', departmentsController.POST).get('/directions',checkToken, directionsController.GET_DIRECTIONS).get('/directions/:id',checkToken, directionsController.GET_DIRECTIONS_BYID).get('/positions',checkToken, positionsController.GET_POSTIONS).get('/positions/:id',checkToken, positionsController.GET_POSTIONS_BYID).get('/:id', checkToken,  departmentsController.GET_DEPARTMENT_BYID).put('/:id', departmentsController.PUT).delete('/:id', checkToken, departmentsController.DELETE)
