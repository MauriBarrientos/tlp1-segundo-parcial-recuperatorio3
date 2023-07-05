// Se obtiene el formulario
const formNuevoPedido = document.querySelector('#formNuevoPedido');

// Se agrega un evento al formulario
formNuevoPedido.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Se obtienen los valores de cada input
    const nombrePedido = document.querySelector('#nombrePedido').value;
    const horaPedido = document.querySelector('#horaPedido').value;
    const nroMesa = document.querySelector('#nroMesa').value;

    // Se crea un objeto con los valores de los inputs
    const nuevoPedido = {
        nombrePedido,
        horaPedido,
        nroMesa
    }

    // Se envia la peticion POST
    try {
        const res = await fetch('http://localhost:4500/api/crear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(nuevoPedido)
        });

        const data = await res.json();
        console.log({ data });
        formNuevoPedido.reset();
        
        Swal.fire({
            icon: 'success',
            title: 'Tarea creada',
            text: 'La tarea se ha creado correctamente'
        })

      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message
        })
    }
})