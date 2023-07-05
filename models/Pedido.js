const { sequelize, DataTypes } = require('../database');
const Pedido = sequelize.define('Reserva',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    nombrePedido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nroMesa: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    horaPedido: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    codigoPedido: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultVale: new Date().getTime(),
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    createdAt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    deletedAt: {
        type: DataTypes.DATEONLY,
        allowNull: true
    }
},{
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    tableName: 'pedidos'
});

//Crear la tabla si esta no existe
Pedido.sync({alter: true});

module.exports = Pedido;