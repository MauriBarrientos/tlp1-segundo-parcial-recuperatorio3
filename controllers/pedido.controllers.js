const ctrlPedido = {};
const Pedido = require('../models/Pedido');

//Controlador para obtener todos los pedidos

ctrlPedido.obtenerPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll({
            where: {
                estado: true
            }
        });

        if (!pedidos || pedidos.length === 0) {
            throw ({
                status: 404,
                message: 'No hay Pedidos registradas'
            })
        }
        console.log(pedidos)

        return res.json(pedidos);
    } catch (error) {
        console.log('Error de trycatch en obtener pedidos')
        console.log(error)
        return res.status(error.status || 500).json({
            message: error.message || 'Error interno del servidor'
        });
    }
}

//Cotrl para obtener una Pedido
ctrlPedido.obtenerPedido = async (req, res) => {
    const {id} = req.params;

    try { 
        const pedido = await Pedido.finOne({
            where: {
                id,
                estado: true
            }
        });
        if (!pedido){
            throw ({
                status: 404,
                message: 'No existe tal pedido'
            })
        }

        return res.json(pedido);
    }catch (error) {
        return res.status (error.status || 500).json(error.message|| 'Error interno del server');
    }
}

ctrlPedido.crearPedido = async (req, res) => {
    const { nombrePedido, nroMesa, nroPedido, horaPedido } = req.body;
    
    try {
        const pedido = await Pedido.create({
            nombrePedido,
            nroMesa,
            nroPedido,
            horaPedido
        });

        if (!pedido) {
            throw ({
                status: 400,
                message: 'No se pudo crear el Pedido'
            })
        }

        return res.json(pedido);
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json(error.message || 'Error interno del servidor');
    }
}


//CTRL para actualizar una Pedido
ctrlPedido.actualizarPedido = async (req, res) => {
    const { id } = req.params;
    const { nombrePedido, nroMesa, nroPedido, horaPedido } = req.body;
    
    try {
        const pedidoActualizado = await Pedido.update({
            nombrePedido,
            nroMesa,
            nroPedido,
            horaPedido
        }, {
            where: {
                id,
                estado: true
            }
        });

        if (!pedidoActualizado) {
            throw ({
                status: 400,
                message: 'No se pudo actualizar el Pedido'
            })
        }

        return res.json({
            message: 'Pedido actualizada correctamente',
            pedidoActualizado
            
        });
    } catch (error) {
        return res.status(error.status || 500).json(error.message || 'Error interno del servidor');
    }
}

//CTRL para eliminar Pedidos

ctrlPedido.eliminarPedido = async (req, res) => {
    const { id } = req.params;

    try {
        const pedidoEliminado = await Pedido.update({
            estado: false
        }, {
            where: {
                id,
                estado: true
            }
        });

        if (!pedidoEliminado) {
            throw ({
                status: 400,
                message: 'No se pudo eliminar el Pedido'
            })
        }

        return res.json({pedidoEliminado, message: 'Pedido eliminado correctamente' });
    } catch (error) {
        return res.status(error.status || 500).json(error.message || 'Error interno del servidor');
    }
}


module.exports = ctrlPedido;