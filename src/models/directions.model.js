import { sequelize } from '../utils/sequelize.js';
import { Op, DataTypes, Model, Sequelize } from "sequelize";
class directions extends Model {}

directions.init({
    dir_name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    duration: {
     type:   DataTypes.STRING(12),
     allowNull: false
    },
    salary: {
        type: DataTypes.INTEGER,
        allowNull: false

    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    createdAt: 'start_date',
    sequelize
})

export {directions}



