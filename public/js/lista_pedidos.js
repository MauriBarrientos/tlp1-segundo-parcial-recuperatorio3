const listadoPedidos = document.querySelector('#listadoPedidos');
const pedidos = {};

const obtenerPedidos = async () => {
    const res = await fetch('http://localhost:4500/api/pedidos', {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    });

    if(res.status === 404 ) {
        return [];
    }

    const data = await res.json();
    return data;
}

const eliminarPedido = async (event) => {
    const id = event.target.dataset.id;

    try {
        const res = await fetch(`http://localhost:4000/api/pedido/${id}`, {
            method: 'DELETE'
        });

        const data = await res.json();

        console.log(data);

        Swal.fire({
            icon: 'success',
            title: 'Pedido eliminado',
            text: data.message,
        });
        
        setTimeout(() => {
            window.location.reload();
        }, 2200);

    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
        })
    }

}

const mostrarPedidos = (pedidos) => {

    // Si no hay tareas, mostrar un mensaje
    if(pedidos.length === 0){
        listadoPedidos.innerHTML = `
            <tr>
                <td colspan="3" class="text-center">No hay Pedidos registrados</td>
            </tr>
        `;
        return;
    };

    pedidos.forEach(pedido => {
        listadoPedidos.innerHTML += `
                    <tr>
                        <td>${pedido.nombrePedido}</td>
                        <td>${pedido.horaPedido}</td>
                        <td>${pedido.nroMesa}</td>
                        <td>${pedido.codigoPedido}</td>
                        <td>
                            <button onclick=eliminarPedido(event) class="btn btn-danger btn-sm" data-id="${pedido.id}">Eliminar</button>
                            <a href="/Pedido/editar/${pedido.id}" class="btn btn-warning btn-sm">Editar</a>
                        </td>
                    </tr>
                `;
    });
}

// Obtener las tareas automáticamente cuando se carga la página
document.addEventListener('DOMContentLoaded', async () => {

    console.log('DOM cargado')

    // Dentro de try se coloca el código que se quiere ejecutar
    try {
        const pedidos = await obtenerPedidos();     
        mostrarPedidos(pedidos);
    } catch (error) {  // Dentro de catch se coloca el código que se ejecutará en caso de que haya un error
        console.log({ error });

        // Mensaje para el usuario
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
        });
    }
});