import {
  admin,
  departments,
  directions,
  groups,
  positions,
  users,
} from "../models/index.js";
import sha256 from "sha256";
import { sendMail } from "../utils/nodemailer.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
class groupsContr {
  async GET_GROUPS(req, res) {
    try {
        let token = jwt.verify(req.headers.token, process.env.SECRET_KEY);
      if (token.role == "teacher") {
        const teacher = await users.findOne({ where: { email: token.gmail } });
        const tch_groups = await groups.findAll({
          where: { id: teacher.group_ref_id },
          include: users
        });
        return res.send({
          status: 200,
          tch_groups
        });
      }
      const data = await groups.findAll({
        raw: true,
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
  async GET_GROUP_BYID(req, res) {
    try {
      const { id } = req.params;
      let token = jwt.verify(req.headers.token, process.env.SECRET_KEY);
      if (token.role == "teacher") {
        const teacher = await users.findOne({ where: { email: token.gmail } });
        if(id != teacher.group_ref_id) throw new Error('It is not your group');
        const data = await groups.findOne({
          where: { id },
          include: [users],
        });
        const gr_dir = await directions.findOne({where: {id: data.dir_ref_id}})
        return res.send({
          status: 200,
          data,
          direction: gr_dir 
        });
      }
      const data = await groups.findOne({
        where: { id },
        include: [users],
      });
      if (!data) throw new Error("Not found group");
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
      const { dir_ref_id, gr_number, salary } = req.body;
      if (!dir_ref_id || !gr_number || !salary) throw new Error("Invalid data!");
      if (typeof gr_number != "number")
      throw new Error("Invalid gr_number");
      const isDirExists = await directions.findOne({
        where: { id: dir_ref_id },
      });
      if (!isDirExists)
        throw new Error("Department by id " + dir_ref_id + " is not exists");
      const data = await groups.create(req.body);
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
      const { dir_ref_id, gr_number, salary } = req.body;
      if (!dir_ref_id && !gr_number && !salary) throw new Error("Invalid data!");
      if(gr_number){
        if (typeof gr_number != "number")
        throw new Error("Invalid gr_number");
      }
      if (dir_ref_id) {
        const isDirExists = await directions.findOne({
          where: { id: dir_ref_id },
        });
        if (!isDirExists)
          throw new Error("Department by id " + dir_ref_id + " is not exists");
      }
      const data = await groups.update(req.body, {
        where: { id: req.params.id },
        returning: true
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
  async DELETE(req, res) {
    try {
      const {id} = req.params;
      const isGrExists = await groups.findOne({where: {
        id
      }});
      if(!isGrExists) throw new Error('Not found group')
      const data = await groups.update({end_date: new Date()}, {where: {id}});
    res.send({
      status: 200,
      message: 'Group was succesgully deleted'
    });
    } catch (error) {
      
    }
  }
}

export const groupsController = new groupsContr();
