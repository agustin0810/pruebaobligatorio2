const listLibros = (setLista) =>{
    fetch('http://localhost:5000/libro')
    .then(response => {
        // Check if the response status is OK (200-299)
        if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json()
    })
    .then(data => {
        setLista(data);
        console.log('Data:', data);
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}
const listBibliotecas = (setLista) =>{
    fetch('http://localhost:5000/biblioteca')
    .then(response => {
        // Check if the response status is OK (200-299)
        if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json()
    })
    .then(data => {
        setLista(data);
        console.log('Data:', data);
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}
const listClientes = (setLista) =>{
    fetch('http://localhost:5000/cliente')
    .then(response => {
        // Check if the response status is OK (200-299)
        if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json()
    })
    .then(data => {
        setLista(data);
        console.log('Data:', data);
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}
const getLibro = (idLibro) =>{
    return new Promise((resolve, reject) => {
        fetch('http://localhost:5000/libro/' + idLibro, {
            method: 'GET',
        })
            .then(response => {
                // Check if the response status is OK (200-299)
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json()
                
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}
const getBiblioteca = (idBiblioteca) =>{
    return new Promise((resolve, reject) => {
        fetch('http://localhost:5000/biblioteca/' + idBiblioteca, {
            method: 'GET',
        })
            .then(response => {
                // Check if the response status is OK (200-299)
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json()
                
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}
const getCliente = (ci) =>{
    return new Promise((resolve, reject) => {
        fetch('http://localhost:5000/cliente/' + ci, {
            method: 'GET',
        })
            .then(response => {
                // Check if the response status is OK (200-299)
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json()
                
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

const createLibro = (codLibro, titulo, idBiblioteca, setMsg, setSuccess, setListaLibros) =>{
    console.log(codLibro)
    console.log(titulo)
    console.log(idBiblioteca)
    fetch('http://localhost:5000/libro', {
        method: 'POST',
        body: JSON.stringify({
            codigoBarras: codLibro,
            titulo: titulo
        }),
        headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if needed (e.g., authorization headers)
          },
    })
    .then(response => {
        // Check if the response status is OK (200-299)
        if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
        }
        console.log(idBiblioteca)
        fetch('http://localhost:5000/'+codLibro+'/asignarBiblioteca/'+idBiblioteca, {
            method: 'PUT'
        })
        .then(response => {
            // Check if the response status is OK (200-299)
            if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            setMsg("Libro agregado y asignado a una biblioteca")
            setSuccess(true)
            listLibros(setListaLibros)
            console.log('Data:', data);
    
        })
        return response.json();
        
    })
    .then(data => {
        setMsg("Libro agregado con éxito")
        setSuccess(true)
        listLibros(setListaLibros)
        console.log('Data:', data);

    })
    .catch(error => {
        setMsg(error)
        setSuccess(false)
        console.error('Fetch error:', error);
    });
}
const createBiblioteca = (codBiblioteca, direccion, clientes, setListaBibliotecas, setError) =>{
    
    fetch('http://localhost:5000/biblioteca', {
        method: 'POST',
        body: JSON.stringify({
            id: codBiblioteca,
            direccion: direccion,
            clientes: clientes
        }),
        headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if needed (e.g., authorization headers)
          },
    })
    .then(response => {
        // Check if the response status is OK (200-299)
        if (!response.ok) {
            return response.text().then(errMessage => {
                throw new Error(errMessage || 'Error inesperado');
            });
        }
        return response.json();
        
    })
    .then(data => {
        listBibliotecas(setListaBibliotecas)
        setError("")
        console.log('Data:', data);

    })
    .catch(error => {
        setError(error.message)
    });
}
const createCliente = (ci, nombreCompleto, setListaClientes) =>{
    
    fetch('http://localhost:5000/cliente', {
        method: 'POST',
        body: JSON.stringify({
            ci: ci,
            nombreCompleto: nombreCompleto
        }),
        headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if needed (e.g., authorization headers)
          },
    })
    .then(response => {
        // Check if the response status is OK (200-299)
        if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
        
    })
    .then(data => {
        listClientes(setListaClientes)
        console.log('Data:', data);

    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}
const deleteLibro = (codLibro, setMsg, setSuccess, setListaLibros) =>{
    fetch('http://localhost:5000/libro/'+codLibro, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if needed (e.g., authorization headers)
          },
    })
    .then(response => {
        // Check if the response status is OK (200-299)
        if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.text();
        
    })
    .then(data => {
        setMsg(data)
        setSuccess(true)
        listLibros(setListaLibros)
        console.log('Data:', data);

    })
    .catch(error => {
        setMsg(error)
        setSuccess(false)
        console.error('Fetch error:', error);
    });
}
const deleteCliente = (ci, setClientes) =>{
    fetch('http://localhost:5000/cliente/'+ci, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if needed (e.g., authorization headers)
          },
    })
    .then(response => {
        // Check if the response status is OK (200-299)
        if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.text();
        
    })
    .then(data => {
        listClientes(setClientes)
        console.log('Data:', data);

    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}
const deleteBiblioteca = (codBiblioteca, setListaBibliotecas) =>{
    fetch('http://localhost:5000/biblioteca/'+codBiblioteca, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if needed (e.g., authorization headers)
          },
    })
    .then(response => {
        // Check if the response status is OK (200-299)
        if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.text();
        
    })
    .then(data => {
        console.log('Data:', data);
        listBibliotecas(setListaBibliotecas)

    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}
export default {listLibros, listBibliotecas, deleteLibro, deleteBiblioteca, createLibro, createBiblioteca, getLibro, getBiblioteca, createCliente, getCliente, listClientes, deleteCliente};