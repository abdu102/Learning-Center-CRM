import { admin, checks, groups, users } from "../models/index.js";
import jwt from 'jsonwebtoken'
import "dotenv/config";
class checksContr {
  async GET_CHECKS(req, res) {
    try {
      const { id } = req.params;
      const data = await checks.findAll({raw:true})
      res.send({
        status: 200,
        data,
      });
    } catch (error) {
      res.status(501).send({
        status: 501,
        message: error.message,
        data: null,
      });
    }
  }
  async GET_CHECKS_BYGROUP_ID(req, res) {
    try {
      let token = jwt.verify(req.headers.token, process.env.SECRET_KEY);
    if(token.role != 'admin' && token.role != 'teacher') throw new Error('Invalid token')
      const { id } = req.params;
      if(token.role == 'teacher') {  
        const teacher = await users.findOne({where: {email: token.gmail}})
        const tech_gr = await groups.findAll({where: {id: teacher.group_ref_id}})
        if(!tech_gr.length) throw new Error('Teacher dont have ggroups');
        if(id != teacher.group_ref_id) throw new Error('It is not your group');
        const user_checks = await checks.findAll({where: {gr_ref_id: id}})
        return res.send({
          status: 200,
          user_checks
        })
      }
    
      const data = await checks.findAll({
        where: { gr_ref_id: id },
      });
      res.send({
        status: 200,
        data,
      });
    } catch (error) {
      res.status(501).send({
        status: 501,
        message: error.message,
        data: null,
      });
    }
  }
  async POST(req, res) {
    try {
      const { gr_ref_id, in_class, not_in_class } = req.body;
      let check = jwt.verify(req.headers.token, process.env.SECRET_KEY);
      if (check.role != "teacher" && check.role != "admin")
        throw new Error("Only admin or techer can do the checking");
    if(check.role == 'teacher') {
      const find_teacher = await users.findOne({
        where: { email: check.gmail },
      });
      if (find_teacher.group_ref_id != gr_ref_id)
        throw new Error("Your not the teacher of the group");
      if (!gr_ref_id || !in_class || !not_in_class)
        throw new Error("Invalid data");
    }

      if (typeof gr_ref_id != "number") throw new Error("Invalid gr_ref_id");
      const data = await checks.create(req.body);
      res.send({
        status: 200,
        data,
      });
    } catch (error) {
      res.status(501).send({
        status: 502,
        message: error.message,
        data: null,
      });
    }
  }
  async PUT(req, res) {
    try {
      const { gr_ref_id, in_class, not_in_class } = req.body;
        let check = jwt.verify(req.headers.token, process.env.SECRET_KEY);
      if (check.role != "teacher" && check.role != "admin")
        throw new Error("Only admin or techer can do the checking");
if(check.role == 'teacher') {
  const find_teacher = await users.findOne({
    where: { email: check.gmail },
  });
  if (find_teacher.group_ref_id != gr_ref_id)
    throw new Error("Your not the teacher of the group");
  if (!gr_ref_id || !in_class || !not_in_class)
    throw new Error("Invalid data");
  const isCheckExists = await checks.findByPk( req.params.id)
  if(!isCheckExists) throw new Error('Not found check')
}
      let data;
      if (gr_ref_id) {
        if (typeof gr_ref_id != "number") throw new Error("Invalid gr_ref_id");
      }
      data = await checks.update(req.body, { where: { id: req.params.id }, returning: true});
      res.send({
        status: 200,
        data,
      });
    } catch (error) {
      res.status(501).send({
        status: 502,
        message: error.message,
        data: null,
      });
    }
  }
}

export const checksController = new checksContr();
