const ctrlReserva = {};
const Reserva = require('../models/Reserva');

//Controlador para obtener todas las reservas

ctrlReserva.obtenerReservas = async (req, res) => {
    try {
        const reservas = await Reserva.findAll({
            where: {
                estado: true,
                // reservaId: req.reserva.id
            }
        });

        if (!reservas || reservas.length === 0) {
            throw ({
                status: 404,
                message: 'No hay reservas registradas'
            })
        }
        console.log(reservas)

        return res.json(reservas);
    } catch (error) {
        console.log('Error de trycatch en obtener reservas')
        console.log(error)
        return res.status(error.status || 500).json({
            message: error.message || 'Error interno del servidor'
        });
    }
}

//Cotrl para obtener una reserva
ctrlReserva.obtenerReserva = async (req, res) => {
    const {id} = req.params;

    try { 
        const reserva = await Reserva.finOne({
            where: {
                id,
                estado: true
            }
        });
        if (!reserva){
            throw ({
                status: 404,
                message: 'No existe tal reserva'
            })
        }

        return res.json(reserva);
    }catch (error) {
        return res.status (error.status || 500).json(error.message|| 'Error interno del server');
    }
}

ctrlReserva.crearReserva = async (req, res) => {
    const { nombre, apellidos, fechaIngreso, fechaSalida, numero, nroHabitacion, nroPersonas} = req.body;
    
    try {
        const reserva = await Reserva.create({
            nombre,
            apellidos,
            fechaIngreso,
            fechaSalida,
            numero,
            nroHabitacion,
            nroPersonas
        });

        if (!reserva) {
            throw ({
                status: 400,
                message: 'No se pudo crear la reserva'
            })
        }

        return res.json(reserva);
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json(error.message || 'Error interno del servidor');
    }
}


//CTRL para actualizar una reserva
ctrlReserva.actualizarReserva = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellidos, fechaIngreso, fechaSalida, numero, nroHabitacion, nroPersonas } = req.body;
    
    try {
        const reservaActualizada = await Reserva.update({
            nombre,
            apellidos,
            fechaIngreso,
            fechaSalida,
            numero,
            nroHabitacion,
            nroPersonas
        }, {
            where: {
                id,
                estado: true
            }
        });

        if (!reservaActualizada) {
            throw ({
                status: 400,
                message: 'No se pudo actualizar la reserva'
            })
        }

        return res.json({
            message: 'reserva actualizada correctamente',
            reservaActualizada
            
        });
    } catch (error) {
        return res.status(error.status || 500).json(error.message || 'Error interno del servidor');
    }
}

//CTRL para eliminar reservas

ctrlReserva.eliminarReserva = async (req, res) => {
    const { id } = req.params;

    try {
        const reservaEliminada = await Reserva.update({
            estado: false
        }, {
            where: {
                id,
                estado: true
            }
        });

        if (!reservaEliminada) {
            throw ({
                status: 400,
                message: 'No se pudo eliminar la reserva'
            })
        }

        return res.json({reservaEliminada, message: 'reserva eliminada correctamente' });
    } catch (error) {
        return res.status(error.status || 500).json(error.message || 'Error interno del servidor');
    }
}

// ==========================================
//         Rutas para CRUD de reservas
// ==========================================

// Obtener todas las reservas
// Obtener una reserva
// Crear una reserva
// Actualizar una reserva
// Eliminar una reserva de forma lógica

module.exports = ctrlReserva;