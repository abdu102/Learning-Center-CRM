import { sequelize } from '../utils/sequelize.js';
import { Op, DataTypes, Model, Sequelize } from "sequelize";
class outlays extends Model {}

outlays.init({
    reason: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false

    }
}, {
    createdAt: 'out_time',
    sequelize
})

export {outlays, sequelize}