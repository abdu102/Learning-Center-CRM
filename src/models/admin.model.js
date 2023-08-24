import { sequelize } from '../utils/sequelize.js';
import { Op, DataTypes, Model, Sequelize } from "sequelize";
class admin extends Model {}

admin.init({
    gmail: {
        type: DataTypes.STRING,
        unique: true
    },
    contact: {
     type:   DataTypes.STRING,
     unique: true
    }
}, {
    sequelize
})

export {admin}

// admin.create({gmail: 'abduvohidovabdulvoris@gmail.com', contact: '+998900013933'})