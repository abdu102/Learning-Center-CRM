import { sequelize } from '../utils/sequelize.js';
import { Op, DataTypes, Model, Sequelize } from "sequelize";
class incomes extends Model {}

incomes.init({
    reason: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false

    }
}, {
    createdAt: 'inc_time',
    sequelize
})

export {incomes}