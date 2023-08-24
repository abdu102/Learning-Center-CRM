import { sequelize } from '../utils/sequelize.js';
import { Op, DataTypes, Model, Sequelize } from "sequelize";
class checks extends Model {}

checks.init({
    in_class: {
        type: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    not_in_class: {
        type: DataTypes.ARRAY(DataTypes.INTEGER)
    },
}, {
    createdAt: 'add_date',
    sequelize
})

export {checks}