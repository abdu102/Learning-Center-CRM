import { admin, departments, directions, groups, positions, users } from "../models/index.js";
import sha256 from "sha256";
import { sendMail } from "../utils/nodemailer.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
class positionsContr {
    async GET_POSTIONS(req, res) {
        try {
            let data
            if(Object.keys(req.query).length > 0) {
                if(req.query.positions) {
                     data = await positions.findAll({
                        raw: true,
                        where: {
                            pos_name: req.query.positions
                        }
                      });
                }
            } else {
                data = await positions.findAll({
                 raw: true
               });
            }
          res.send({
            status: 200,
            data
          });
        } catch (error) {
          res.status(501).send({
            status: 501,
            message: error.message,
            data: null,
          });
        }
      }
    async GET_POSTIONS_BYID(req, res) {
    try {
      const { id } = req.params;
      const data = await positions.findOne({
        where: { id },
        include: 
            [ users ]
        ,
      });
      if(!data) throw new Error('Not found position')
      res.send({
        status: 200,
        data
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
            const {pos_name, salary, dep_ref_id} = req.body;
            if (!pos_name || !salary || !dep_ref_id)
              throw new Error("Invalid data!");
            const isDepartExists = await departments.findOne({where: {id: dep_ref_id}})
            if(!isDepartExists) throw new Error('Department by id ' + dep_ref_id + ' is not exists')
            const data = await positions.create(req.body);
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
    async PUT(req, res) {
        try {
            const {pos_name, salary, dep_ref_id} = req.body;
            if (!pos_name && !salary && !dep_ref_id)
              throw new Error("Invalid data!");
            if(dep_ref_id) {
                const isDepartExists = await departments.findOne({where: {id: dep_ref_id}})
                if(!isDepartExists) throw new Error('Department by id ' + dep_ref_id + ' is not exists')
            }
            const data = await positions.update(req.body, {where: {id: req.params.id}, returning: true});
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
    async DELETE(req, res) {
      try {
        const {id} = req.params;
        const isPosExists = await positions.findOne({where: {
          id
        }});
        if(!isPosExists) throw new Error('Not found positions')
        const data = await positions.update({deleted_at: new Date()}, {where: {id}});
      res.send({
        status: 200,
        message: 'Position was succesgully deleted'
      });
      } catch (error) {
        res.status(501).send({
          status: 501,
          message: error.message,
          data: null,
        });
      }
    }
}

export const positionsController = new positionsContr();
