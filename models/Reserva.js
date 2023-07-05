const { sequelize, DataTypes } = require('../database');
const Reserva = sequelize.define('Reserva',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    // nombre: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    // apellidos: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    // },
    // fechaIngreso: {
    //     type: DataTypes.DATEONLY,
    //     allowNull: false,
    // },
    // fechaSalida: {
    //     type: DataTypes.DATEONLY,
    //     allowNull: false,
    // },

    numero: { 
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nroHabitacion:{
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    nroPersona: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    codigoReserva: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultVale: new Date().getTime(),
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
},{
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    tableName: 'reserva'
});

//Crear la tabla si esta no existe
Reserva.sync({alter: true});

module.exports = Reserva;