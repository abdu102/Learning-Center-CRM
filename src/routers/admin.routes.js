import { Router } from "express";
import { adminController } from "../controllers/admin.controller.js";
export const adminRouter = new Router()
adminRouter.get('/pass/:code', adminController.CHECK_CODE).post('/login', adminController.LOGIN);
