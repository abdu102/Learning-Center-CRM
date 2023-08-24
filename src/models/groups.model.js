import { sequelize } from '../utils/sequelize.js';
import { Op, DataTypes, Model, Sequelize } from "sequelize";
class groups extends Model {}

groups.init({
    gr_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    salary: {
        type: DataTypes.INTEGER,
        allowNull: false

    },
    begin_date: {
       type: DataTypes.DATE,
       defaultValue: DataTypes.NOW()
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    createdAt: false,
    sequelize
})

export {groups}

