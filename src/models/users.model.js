import { sequelize } from '../utils/sequelize.js';
import { Op, DataTypes, Model, Sequelize } from "sequelize";
class users extends Model {}

users.init({
    first_name: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    gender: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isIn: [[1, 2]]
        }
    },
    contact: {
        type: DataTypes.STRING(16),
        unique: true
    },
    email: {
        type: DataTypes.STRING(64),
        unique: true
    },
    left_date: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    createdAt: 'come_date',
    sequelize
})

export {users}



// users.create({first_name: ''})
