import {
    incomes,
    outlays,
  } from "../models/index.js";
  import jwt from "jsonwebtoken";
  import "dotenv/config";
  import { where } from "sequelize";
  class financeContr {
    async GET_INCOMES(req, res) {
      try {
        let token = jwt.verify(req.headers.token, process.env.SECRET_KEY);
    if(token.role != 'admin' && token.role != 'accountant') throw new Error('Invalid token')
        let data;
        if (Object.keys(req.query).length > 0) {
          if(req.query.month) {
            const {month} = req.query;
            const data = await incomes.findAll({raw: true});
            let dateNow = new Date();
           const result = data.filter(e => {
            let elDate = new Date(e.inc_time)
            if(elDate.getFullYear() == dateNow.getFullYear()) {

              if(month == (elDate.getMonth() + 1)) {
                return e
              }
            }
           });
         return res.send({
            status: 200,
            data: result
           });
          }
        } else {
          data = await incomes.findAll({
            raw: true,
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
    async POST_INCOMES(req, res) {
      try {
        let token = jwt.verify(req.headers.token, process.env.SECRET_KEY);
        if(token.role != 'admin' && token.role != 'accountant') throw new Error('Invalid token');
        const {reason, amount, user_ref_id} = req.body;
      
        const data =  await incomes.create({reason, amount, user_ref_id})
        res.send({
          status: 200,
          data
        })
      } catch (error) {
        res.status(501).send({
          status: 501,
          message: error.message,
          data: null,
        });
      }
    }
    async UPDATE_INCOMES(req, res) {
      try {
        let token = jwt.verify(req.headers.token, process.env.SECRET_KEY);
        if(token.role != 'admin' && token.role != 'accountant') throw new Error('Invalid token');
        const {reason, amount, user_ref_id} = req.body;
        if(!reason && !amount && !user_ref_id) throw new Error('Invalid data!')
        const data =  await incomes.update({reason, amount, user_ref_id}, {where: {id: req.params.id}, returning: true});
        res.send({
          status: 200,
          data
        })
      } catch (error) {
        res.status(501).send({
          status: 501,
          message: error.message,
          data: null,
        });
      }
    }
    async GET_OUTLAYS(req, res) {
      try {
        let token = jwt.verify(req.headers.token, process.env.SECRET_KEY);
    if(token.role != 'admin' && token.role != 'accountant') throw new Error('Invalid token')
        let data;
        if (Object.keys(req.query).length > 0) {
          if(req.query.month) {
            const {month} = req.query;
            const data = await outlays.findAll({raw: true});
            let dateNow = new Date();
           const result = data.filter(e => {
            let elDate = new Date(e.out_time)
            if(elDate.getFullYear() == dateNow.getFullYear()) {
              if(month == (elDate.getMonth() + 1)) {
                return e
              }
            }
           });
         return res.send({
            status: 200,
            data: result
           });
          }
        } else {
          data = await outlays.findAll({
            raw: true,
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
    async POST_OUTLAYS(req, res) {
      try {
        let token = jwt.verify(req.headers.token, process.env.SECRET_KEY);
        if(token.role != 'admin' && token.role != 'accountant') throw new Error('Invalid token');
        const {reason, amount} = req.body;
        const data =  await outlays.create({reason, amount})
        res.send({
          status: 200,
          data
        })
      } catch (error) {
        res.status(501).send({
          status: 501,
          message: error.message,
          data: null,
        });
      }
    }
    async UPDATE_OUTLAYS(req, res) {
      try {
        let token = jwt.verify(req.headers.token, process.env.SECRET_KEY);
        if(token.role != 'admin' && token.role != 'accountant') throw new Error('Invalid token');
        const {reason, amount} = req.body;
        if(!reason && !amount ) throw new Error('Invalid data!')
        const data =  await outlays.update({reason, amount}, {where: {id: req.params.id}, returning: true});

        res.send({
          status: 200,
          data
        })
      } catch (error) {
        res.status(501).send({
          status: 501,
          message: error.message,
          data: null,
        });
      }
    }
  }
  
  export const financeController = new financeContr();
  
  // async GET_USER_BYID(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const data = await users.findOne({
  //       where: { id },
  //       include: [checks],
  //       where: {
  //         left_date: null,
  //       },
  //     });
  //     if (!data) throw new Error("Not found group");
  //     res.send({
  //       status: 200,
  //       data,
  //     });
  //   } catch (error) {
  //     res.status(501).send({
  //       status: 501,
  //       message: error.message,
  //       data: null,
  //     });
  //   }
  // }