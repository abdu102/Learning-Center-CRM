import { sequelize } from '../utils/sequelize.js';
import { Op, DataTypes, Model, Sequelize } from "sequelize";
class positions extends Model {}

positions.init({
    pos_name: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    salary: {
        type: DataTypes.INTEGER
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    createdAt: 'start_date',
    sequelize
})

export {positions}


