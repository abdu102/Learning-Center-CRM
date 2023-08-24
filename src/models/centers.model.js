import { sequelize } from '../utils/sequelize.js';
import { Op, DataTypes, Model, Sequelize } from "sequelize";
class centers extends Model {}

centers.init({
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    address: {
     type:   DataTypes.STRING(50),
     allowNull: false
    
    },
    close_date: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    createdAt: 'open_date',
    sequelize
})

export {centers}


// centers.create({name: 'NAJOT', address: 'Chimboy'})