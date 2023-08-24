// import { authors, books } from "../models/index.js";
import { admin, users } from "../models/index.js";
import sha256 from "sha256";
import { sendMail } from "../utils/nodemailer.js";
import jwt from "jsonwebtoken";
import 'dotenv/config';
class adminContr {
  async LOGIN(req, res) {
 try {
  const {gmail, contact} = req.body;
  const findAdmin = await admin.findOne({
      gmail
    });
    if(!findAdmin) throw new Error('Email is incorrect!');
    if(findAdmin.contact != contact) throw new Error('Password is incorrect!')
    await sendMail(gmail, 'Code for login', process.env.SECRET_KEY);
  res.send({
    status: 200,
    message: 'Login code was send to your gmail'
  })
 } catch (error) {
  res.status(501).send({
    status: 501,
    message: error.message,
    data: null
  })
 }
  }
  async CHECK_CODE(req, res) {
    try {
      const {code} = req.params;
      if(!code) throw new Error('Invalid data!')
      const find_admin = await admin.findAll({raw: true});

    if(code != process.env.SECRET_KEY) throw new Error('Incorrect code');
      res.send({ 
        status: 200,
        token: jwt.sign({role: 'admin', gmail: find_admin[0].gmail}, process.env.SECRET_KEY)
      })
    } catch (error) {
      res.status(501).send({
        status: 501,
        message: error.message,
        data: null
      })
    }
  }
}  
// export default {
//   GET: async (req, res) => {
//     try {
//       const data await books.findAll({
//         include: authors,
//       });
//       res.send({
//         status: 200,
//         data,
//       });
//     } catch (error) {
//       res.send({
//         status: 501,
//         message: error.message,
//       });
//     }
//   },
//   GETID: async (req, res) => {
//     try {
//       const { id } = req.params;
//       const data = await books.findOne({ id, include: authors });
//       res.send({
//         status: 200,
//         data,
//       });
//     } catch (error) {
//       res.send({
//         status: 501,
//         message: error.message,
//       });
//     }
//   },
//   POST: async (req, res) => {
//     try {
//       const { name, genre, published_date, authorId } = req.body;
//       if (!name || !genre || !published_date || !authorId)
//         throw new Error("Invalid data");
//       const data = await books.create(
//         { name, genre, published_date, authorId },
//         { returning: true, raw: true }
//       );
//       res.send({
//         status: 200,
//         data: data.dataValues.id,
//       });
//     } catch (error) {
//       res.send({
//         status: 501,
//         message: error.message,
//       });
//     }
//   },
//   PUT: async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { name, genre, published_date, authorId } = req.body;
//       if (!name && !genre && !published_date && !authorId)
//         throw new Error("Invalid data");
//       const findBook = await books.findOne({ where: { id } });
//       if (!findBook) throw new Error("Bot found book");
//       const data = await books.update(
//         {
//           name: name || findBook.name,
//           genre: genre || findBook.genre,
//           published_date: published_date || findBook.published_date,
//           authorId: authorId || findBook.authorId,
//         },
//         { where: { id: id }, returning: true, raw: true }
//       );
//       res.send({
//         status: 200,
//         data: data[1][0].id,
//       });
//     } catch (error) {
//       res.send({
//         status: 501,
//         message: error.message,
//       });
//     }
//   },
//   DELETE: async (req, res) => {
//     try {
//       const { id } = req.params;
//       const findBook = await books.findOne({ where: { id } });
//       if (!findBook) throw new Error("Bot found book");
//       await books.destroy({ where: { id } });
//       res.send({
//         status: 200,
//         message: "Succesful",
//       });
//     } catch (error) {
//       res.send({
//         status: 501,
//         message: error.message,
//       });
//     }
//   },
// };
export const adminController = new adminContr();