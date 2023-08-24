import { Router } from "express";
import { usersController } from "../controllers/users.controller.js";
import { checkToken, educationToken } from "../middlewares/check_token.js";
import { userValidation } from "../middlewares/validation/user.joi.js";
export const userssRouter = Router();
userssRouter.get('/', educationToken ,usersController.GET_USERS).get('/:id', educationToken ,usersController.GET_USER_BYID).post('/',checkToken,  userValidation, usersController.POST).put('/:id',checkToken, userValidation ,usersController.PUT).post('/login', usersController.LOGIN).delete('/:id', checkToken ,usersController.DELETE)
