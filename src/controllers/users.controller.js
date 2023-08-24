import {
  checks,
  directions,
  groups,
  incomes,
  positions,
  users,
} from "../models/index.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
class usersContr {
  async GET_USERS(req, res) {
    try {
      let token = jwt.verify(req.headers.token, process.env.SECRET_KEY);
      if (token.role == "student") {
        const student = await users.findOne({ where: { email: token.gmail } , raw: true});
        const find_use_gr = await groups.findOne({where: {id: student.group_ref_id}}) 
        const user_dir = await directions.findOne({where: {id: find_use_gr.dir_ref_id}})
        const pay = await incomes.findAll({raw: true});
        let dateNow = new Date();
        const payments = pay.filter(e => {
          let elDate = new Date(e.inc_time)
          if(elDate.getFullYear() == dateNow.getFullYear()) {
            if((dateNow.getMonth()+ 1) == (elDate.getMonth() + 1)) {
              return e
            }
          }
        });
        if(payments.length) {
          student.payment = true
        } else {
          student.payment = false
        }
        return res.send({
          status: 200,
          user_info: student,
          user_group: find_use_gr,
          user_direction: user_dir
        });
      }
      if (token.role == "teacher") {
        const teacher = await users.findOne({ where: { email: token.gmail } });
        const find_user_gr = await groups.findAll({where: {id: teacher.group_ref_id}, raw: true},) 
        const teach_pos = await positions.findOne({where: {id: teacher.pos_ref_id}})
        return res.send({
          status: 200,
          teacher,
          postion: teach_pos,
          teacher_groups: find_user_gr
        });
      }

      let data;
      if (Object.keys(req.query).length > 0) {
        let query = req.query;
        if (query.group) {
          query.group_ref_id = query.group;
          delete query.group;
        }
        if (query.onsite) {
          if (query.onsite == off) {
            (query.left_date = null), delete query.onsite;
          }
          if (query.onsite == on) {
            query.left_date = {[Op.not]: null}
             delete query.onsite;
          }
          if(query.username) {
            query.first_name = query.username
            delete query.username
          }
        }
        if (query.gender) {
          query.gender == "male" ? (query.gender = 1) : (query.gender = 2);
        }
        query.contact ? (query.contact = "+" + query.contact) : "";
        data = await users.findAll({
          raw: true,
          where: req.query,
        });
      } else {
        data = await users.findAll({
          raw: true,
          where: {
            left_date: null,
          },
        });
      }

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
  async GET_USER_BYID(req, res) {
    try {
      const { id } = req.params;
      const data = await users.findOne({
        where: { id },
        include: [checks],
        where: {
          left_date: null,
        },
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
      const { email, pos_ref_id, group_ref_id } = req.body;
      if (group_ref_id) {
        const isGroupExists = await groups.findOne({
          where: { id: group_ref_id },
        });
        if (!isGroupExists)
          throw new Error("Group by id " + group_ref_id + " is not exists");
      }
      const isPosExists = await positions.findOne({
          where: { id: pos_ref_id },
        });
        if (!isPosExists)
        throw new Error("Position by " + pos_ref_id + " does not exists");
    const data = await users.create(req.body);
    
    const pos_name = isPosExists.pos_name.toLowerCase();
    res.send({
        status: 200,
        data,
        token: jwt.sign(
            { role: pos_name, gmail: email },
            process.env.SECRET_KEY
            ),
        });
    } catch (error) {
      res.status(501).send({
        status: 501,
        message: error.message,
        data: null,
      });
    }
  }
  async PUT(req, res) {
    try {
      let token = jwt.verify(req.headers.token, process.env.SECRET_KEY);
      const {email, pos_ref_id, group_ref_id } = req.body;
      if (group_ref_id) {
        const isGroupExists = await groups.findOne({
          where: { id: group_ref_id },
        });
        if (!isGroupExists)
          throw new Error(
            "Department by id " + group_ref_id + " is not exists"
          );
      }
      if (pos_ref_id) {
        const isPosExists = await positions.findOne({
          where: { id: pos_ref_id },
        });
        if (!isPosExists)
          throw new Error("Position by " + pos_ref_id + " does not exists");
        if (email) {
          const pos_name = isPosExists.pos_name.toLowerCase();
          return res.send({
            status: 200,
            data,
            token: jwt.sign(
              { role: pos_name, gmail: email },
              process.env.SECRET_KEY
            ),
          });
        }
      }
      const data = await users.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      if (email) {
        return res.send({
          status: 200,
          data,
          token: jwt.sign(
            { role: token.role, gmail: email },
            process.env.SECRET_KEY
          ),
        });
      }
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
  async LOGIN(req, res) {
    try {
      const { email, contact } = req.body;
      const find_user = await users.findOne({ where: { email } });
      if (!find_user) throw new Error("Not found user, email is incorrect");
      if (find_user.contact != contact) throw new Error("Incorrect contact");
      const user_position = await positions.findOne({
        where: { id: find_user.pos_ref_id },
      });
      const pos_name = user_position.pos_name.toLowerCase();
      res.send({
        status: 200,
        token: jwt.sign(
          { role: pos_name, gmail: email },
          process.env.SECRET_KEY
        ),
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
      const isUserExists = await users.findOne({where: {
        id
      }});
      if(!isUserExists) throw new Error('Not found users')
      const data = await users.update({left_date: new Date()}, {where: {id}});
    res.send({
      status: 200,
      message: 'User was succesgully deleted'
    });
    } catch (error) {
      
    }
  }
}

export const usersController = new usersContr();




// USERS - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3R1ZGVudCIsImdtYWlsIjoicW9iLm51cmlrQGdtYWlsLmNvbSIsImlhdCI6MTY5Mjg1NjkwOH0.MgtucI3MnM14irgxpiLZE0ucZtXZAtjOown4hAS8oU8

// TEACHERS - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidGVhY2hlciIsImdtYWlsIjoicW9iLm51ckBnbWFpbC5jb20iLCJpYXQiOjE2OTI4MTQ0NzV9.YZ_e8PolpxgwaLZVk8mTBiZlGxyOFTu1wMnRy-SBBXg