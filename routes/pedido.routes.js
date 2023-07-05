// TODO: Importar el modelo y controladores de Pedidos, luego vincular rutas con controladores

const router = require('express').Router();
const {
    obtenerPedidos,
    obtenerPedido,
    crearPedido,
    actualizarPedido,
    eliminarPedido
} = require('../controllers/pedido.controllers');

// ==========================================
//         Rutas para renderizar vistas
// ==========================================

// Lista de Pedidos
router.get('/', (req, res) => {
    res.render('index');
});

// Formulario para actualizar una Pedido
router.get('/pedido/editar/:id', (req,res)=>{
    const pedidoId = req.params.id;
    res.render ('pedido/editar_pedido', { id: pedidoId});
});

// Formulario para crear una Pedido

router.get('/pedido/crear', (req, res) =>{
    res.render('pedido/crear_pedido');
})

// ==========================================
//         Rutas para CRUD de Pedidos
// ==========================================

// Obtener todas las Pedidos
router.get('/api/pedidos', obtenerPedidos);

//Obtener una Pedido

router.get('/api/pedido', obtenerPedido)
 
// Crear una Pedido
router.post('/api/crear',crearPedido);
 
// Actualizar una Pedido
router.put('/api/pedido/:id',actualizarPedido);
 
// Eliminar una Pedido de forma lógica
router.delete('/api/pedido/:id',eliminarPedido);

 
 module.exports = router;