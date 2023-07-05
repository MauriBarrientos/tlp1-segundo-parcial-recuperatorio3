// Referencia al formulario
const formEditar = document.querySelector('#formEditar');
const nombrePedido = document.querySelector('#nombre');
const horaPedido = document.querySelector('#horaPedido');
const nroMesa = document.querySelector('#nroMesa');
const pedjidoId = formEditar.dataset.id;

// Funcion para obtener los datos de la tarea cuando se carga la página
document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch(`http://localhost:4500/api/pedido/${pedidoId}`)
    const data = await response.json();

    nombrePedido.value = data.nombrePedido;
    horaPedido.value = data.horaPedido;
    nroMesa.value = data.nroMesa;
})


// Escuchar el evento submit
formEditar.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Se crea un objeto con los datos del formulario
    const formData = {
        nombrePedido: e.target.nombrePedido.value,
        nombrePedido: e.target.horaPedido.value,
        nroMesa: e.target.nroMesa.value }

    try {
        // Se envia la peticion al servidor
        const resp = await fetch(`http://localhost:4500/api/pedido/${pedidoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        if(resp.status !== 200){
            throw({
                message: 'Error al editar el pedido'
            })
        }

        const data = await resp.json();

        Swal.fire({
            icon: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1500
        })
        setTimeout(() => {
            window.location.href = '/';
        }, 1500);

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: error.message,
            timer: 2000,
        })
    }
});