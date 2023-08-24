import Joi from "joi";
import { users } from "../../models/index.js";

export async function userValidation(req, res, next) {
  try {
    const schema = Joi.object({
      first_name: Joi.string().min(3).max(30).required(),
      last_name: Joi.string().min(3).max(30).required(),

      gender: Joi.number().min(1).max(2),

      contact: Joi.string()
        .regex(/^[0-9]{12}$/)
        .message("Contact must have 9 digits, example: 998909009090"),

      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "ru", "yahoo"] },
      }),
      group_ref_id: Joi.number(),
      pos_ref_id: Joi.number().required(),
    });
    if (req.method == "POST") {
      const {
        first_name,
        last_name,
        gender,
        contact,
        email,
        pos_ref_id,
      } = req.body;
      if (
        !first_name ||
        !last_name ||
        !gender ||
        !contact ||
        !email ||
        !pos_ref_id 
      )
        throw new Error("Invalid datas!");
      const { value, error } = schema.validate(req.body);
      if (error) throw new Error(error);

      return next();
    } else {
        const {
            first_name,
            last_name,
            gender,
            contact,
            email,
            group_ref_id,
            pos_ref_id,
          } = req.body;
          if (
            !first_name &&
            !last_name &&
            !gender &&
            !contact &&
            !email &&
            !pos_ref_id &&
            !group_ref_id
          )
        throw new Error("Invalid data");
      const findUser = await users.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!findUser) throw new Error("Not found users");

      const { value, error } = schema.validate({
        first_name: first_name || findUser.first_name,
        last_name: last_name || findUser.last_name,
        gender: gender || findUser.gender,
        contact: contact || findUser.contact,
        email: email || findUser.email,
        pos_ref_id: pos_ref_id || findUser.pos_ref_id
      });
      if (error) throw new Error(error);
      return next();
    }
  } catch (error) {
    res.status(502).send({ status: 501, message: error.message });
  }
}
