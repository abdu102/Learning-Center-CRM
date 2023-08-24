import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('postgres://qxdezmyu:w28aiZezOJM8KxjTB4S6UTj9SBJmE0Xt@batyr.db.elephantsql.com/qxdezmyu');
try {
    await sequelize.authenticate();
    console.log('Connectoin to database was succesfull');
} catch (error) {
    console.log('Error in connecting to database: ' + error.message);
}