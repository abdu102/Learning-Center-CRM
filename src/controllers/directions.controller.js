import { admin, departments, directions, groups, positions, users } from "../models/index.js";
import sha256 from "sha256";
import { sendMail } from "../utils/nodemailer.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
class directionsContr {
    async GET_DIRECTIONS(req, res) {
        try {
          
          const data = await directions.findAll({
            raw: true
          });
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
    async GET_DIRECTIONS_BYID(req, res) {
    try {
      const { id } = req.params;
      const data = await directions.findOne({
        where: { id },
        include: 
            [ groups ]
        ,
      });
      if(!data) throw new Error('Not found direction')
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
            const {dep_ref_id, dir_name, duration, salary} = req.body;
            const isDepartExists = await departments.findOne({where: {id: dep_ref_id}})
            if(!isDepartExists) throw new Error('Department by id ' + dep_ref_id + ' is not exists')
            const data = await directions.create(req.body);
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
            const {dep_ref_id, dir_name, duration, salary} = req.body;
            if(dep_ref_id) {
                const isDepartExists = await departments.findOne({where: {id: dep_ref_id}})
                if(!isDepartExists) throw new Error('Department by id ' + dep_ref_id + ' is not exists')
            }
            const data = await directions.update( req.body, {where: {id: req.params.id}, returning: true});
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
        const isDirExists = await directions.findOne({where: {
          id
        }});
        if(!isDirExists) throw new Error('Not found direction')
        const data = await directions.update({end_date: new Date()}, {where: {id}})
      res.send({
        status: 200,
        message: 'Direction was succesgully deleted'
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

export const directionsController = new directionsContr();
