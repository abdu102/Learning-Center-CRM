import { Router } from "express";
import { groupsController } from "../controllers/groups.controller.js";
import { checkToken, educationToken } from "../middlewares/check_token.js";
export const groupsRouter = Router();
groupsRouter.get('/', educationToken , groupsController.GET_GROUPS).get('/:id', educationToken , groupsController.GET_GROUP_BYID).post('/', checkToken, groupsController.POST).put('/:id', checkToken,groupsController.PUT).delete('/:id', checkToken, groupsController.DELETE)
