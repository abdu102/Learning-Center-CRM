import Joi from "joi";
import { directions } from "../../models/index.js";

export async function directionValidation(req, res, next) {
  try {
    const schema = Joi.object({
      dep_ref_id: Joi.number().required(),
      dir_name: Joi.string().min(3).max(30).required(),

      duration: Joi.string().min(2).max(12).required(),
      salary: Joi.number().required(),
    });
    if (req.method == "POST") {
      const { dep_ref_id, dir_name, duration, salary } = req.body;
      if (!dep_ref_id || !dir_name || !duration || !salary)
        throw new Error("Invalid data!");
      const { value, error } = schema.validate(req.body);
      if (error) throw new Error(error);

      return next();
    } else {
      const { dep_ref_id, dir_name, duration, salary } = req.body;
      if (!dep_ref_id && !dir_name && !duration && !salary)
        throw new Error("Invalid data!");
      const find_direction = await directions.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!find_direction) throw new Error("Not found direction");
    
      const { value, error } = schema.validate({
        dep_ref_id: dep_ref_id || find_direction.dep_ref_id,
        dir_name: dir_name || find_direction.dir_name,
        duration: duration || find_direction.duration,
        salary: salary || find_direction.salary,
      });
      if (error) throw new Error(error);
      return next();
    }
  } catch (error) {
    res.status(501).send({ status: 501, message: error.message });
  }
}
