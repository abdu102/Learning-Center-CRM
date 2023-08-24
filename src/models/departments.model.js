import { sequelize } from '../utils/sequelize.js';
import { Op, DataTypes, Model, Sequelize } from "sequelize";
class departments extends Model {}

departments.init({
    dep_name: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    createdAt: 'created_at',
    sequelize
})

export {departments}




