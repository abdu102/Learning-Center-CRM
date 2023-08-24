import jwt from "jsonwebtoken";
import 'dotenv/config';
import { admin, users } from "../models/index.js";
export async function checkToken(req, res, next) {
    try {
        if(!req.headers.token) throw new Error('Token should be provided');
        let check = jwt.verify(req.headers.token, process.env.SECRET_KEY);
        const find_admin = await admin.findAll({raw: true});
        if(check.role != 'admin' || check.gmail != find_admin[0].gmail) throw new Error('Invalid token');
       return next()
    } catch (error) {
        res.status(501).send({
            status: 501,
            message: error.message,
            data: null
          })
    }
}

export async function educationToken(req, res, next) {
    try {
        if(!req.headers.token) throw new Error('Token should be provided');
        let check = jwt.verify(req.headers.token, process.env.SECRET_KEY);
        const find_admin = await admin.findOne({where: {gmail: check.gmail}});
   
        const find_user = await users.findOne({where: {email: check.gmail}})
        if(!find_admin && !find_user)  throw new Error('Invalid token');
 
        const isTeacher = find_user?.email == check.gmail && check.role == 'teacher' ?  true : false;

        const isStudent = find_user?.email == check.gmail && check.role == 'student' ?  true : false;
        const isAdmin = find_admin?.gmail == check.gmail && check.role == 'admin' ?  true : false;
        if(!isTeacher && !isStudent && !isAdmin) throw new Error('Invalid token');
       return next()
    } catch (error) {
        res.status(501).send({
            status: 501,
            message: error.message,
            data: null
          })
    }
}