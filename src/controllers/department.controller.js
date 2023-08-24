// import { authors, books } from "../models/index.js";
import {
  admin,
  departments,
  directions,
  positions,
  users,
  groups,
} from "../models/index.js";
import "dotenv/config";
class departmentsContr {
  async GET_DEPARTMENTS(req, res) {
    try {
      let data;
      const count = await departments.count();
      if (Object.keys(req.query).length > 0) {
        if (req.query.positions) {
          data = await positions.findAll({
            include: [users],
            raw: true,
            where: {
              pos_name: req.query.positions,
            },
          });
        } else if (req.query.directions) {
          data = await directions.findAll({
            include: [groups],
            raw: true,
            where: {
              dir_name: req.query.directions,
            },
          });
        }
      } else {
        if (count > 20) {
          data = await departments.findAll({

            raw: true,
            limit: 20,
          });
        } else {
          data = await departments.findAll({
            raw: true,
          });
        }
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
  async GET_DEPARTMENT_BYID(req, res) {
    try {
      const { id } = req.params;
      const data = await departments.findOne({
        where: { id },
        include: [
          {
            model: directions,
          },
          {
            model: positions,
          },
        ],
      });
      if (!data) throw new Error("Not found department");
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
        const {dep_name, center_ref_id} = req.body;
        if(!dep_name || !center_ref_id) throw new Error('Invalid data!');
        if(dep_name.length < 3 || dep_name.length > 60) throw new Error('dep name length mut be more than 2 and less than 61');
        const data = await departments.create({dep_name, center_ref_id});
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
      const {id} = req.params;
        const {dep_name, center_ref_id} = req.body;
        if(!dep_name && !center_ref_id) throw new Error('Invalid data!');
        const isDepExists = await departments.findByPk(id);
        if(!isDepExists) throw new Error('Not found department')
        if(dep_name.length < 3 || dep_name.length > 60) throw new Error('dep name length mut be more than 2 and less than 61');
        const data = await departments.update({dep_name, center_ref_id},{where: {id}} );
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
      const isDepExists = await departments.findOne({where: {
        id
      }});
      if(!isDepExists) throw new Error('Not found Department')
      const data = await departments.update({deleted_at: new Date()}, {where: {id}})
    res.send({
      status: 200,
      message: 'Youser was succesgully deleted'
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

export const departmentsController = new departmentsContr();
