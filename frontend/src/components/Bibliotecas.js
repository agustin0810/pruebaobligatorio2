import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';

import { useEffect, useState } from 'react';

import fetchs from '../fetchs';

import 'bootstrap/dist/css/bootstrap.min.css';

const Bibliotecas = (props) =>{
    const [listaBibliotecas, setListaBibliotecas] = useState(props.listaBibliotecas);
    const [listaClientes, setListaClientes] = useState(props.listaClientes);

    const [biblioteca, setBiblioteca]= useState(null);
    const [error, setError] = useState("")
  
    const [id, setId] = useState(null);
    const [direccion, setDireccion] = useState(null);

    const [clienteCi, setClienteCi] = useState(null);

    const fillForm = (idBiblioteca) =>{
        fetchs.getBiblioteca(idBiblioteca)
        .then(data => {
          setBiblioteca(data)
          setId(data.id)
          setDireccion(data.direccion)
        })
        .catch(error => {
            // Maneja el error si la promesa es rechazada
            console.error('Error al obtener la biblioteca:', error);
        });
      }
    
    return(
        <div className='Bibliotecas' style={{marginTop: "5%"}}>
            <Container>
                <Row>
                <Col>
                    <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Id</Form.Label>
                        <Form.Control value={id} onChange={(e)=>setId(e.target.value)} type="number"  />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control value={direccion} type="text" onChange={(e)=>setDireccion(e.target.value)} placeholder="Dirección" />
                    </Form.Group>
                    <p>{biblioteca!=null?JSON.stringify(biblioteca.clientes):null}</p>
                    {biblioteca != null ? (

                    <Form.Select 
                        value={clienteCi || ""} // Muestra una opción predeterminada si no hay valor
                        aria-label="Cliente" 
                        onChange={(e) => setClienteCi(e.target.value)}
                    >
                        <option value="" disabled>Seleccione un cliente a agregar</option>
                        {listaClientes.map((cliente) => (
                            <option key={cliente.ci} value={cliente.ci}>
                                {cliente.ci + ", " + cliente.nombreCompleto}
                            </option>
                        ))}
                    </Form.Select>
                    ):null}
                    {biblioteca != null ? (
                        <div>
                            <input 
                            type="button" 
                            value="+" 
                            onClick={() => {
                                if (clienteCi) {
                                    // Crea una copia de `biblioteca` con los nuevos clientes
                                    const nuevaBiblioteca = { 
                                        ...biblioteca, 
                                        clientes: [...biblioteca.clientes, { ci: clienteCi }] 
                                    };
                                    setBiblioteca(nuevaBiblioteca);
                                }
                            }} 
                        />
                        <input 
                            type="button" 
                            value="-" 
                            onClick={() => {
                                if (clienteCi) {
                                    // Filtrar la lista de clientes para eliminar el cliente con el `ci` proporcionado
                                    const nuevaBiblioteca = { 
                                        ...biblioteca, 
                                        clientes: biblioteca.clientes.filter(cliente => cliente.ci !== parseInt(clienteCi, 10))
                                    };
                                    setBiblioteca(nuevaBiblioteca);
                                }
                            }} 
                        />
                    </div>
                        
                        
                    ) : null}             
                    <Button variant="primary" type="button" onClick={()=>fetchs.createBiblioteca(id, direccion, biblioteca!=null?biblioteca.clientes:null, setListaBibliotecas, setError)} style={{marginTop: '2.5%', width: '30%', marginLeft: '33.33%'}}>
                        Aceptar
                    </Button>
                    <h1 style={{marginTop: '30px',fontSize: '20px', color: 'red'}}>{error!=""?error:null}</h1>
                    </Form>
                </Col>
                <Col>
                    <Table striped bordered hover style={{marginTop: '2.5%'}}>
                    <thead>
                        <tr>
                        <th>Id</th>
                        <th>Dirección</th>
                        </tr>
                    </thead>
                    <tbody>
                    {listaBibliotecas.map((biblioteca) => (
                        <tr key={biblioteca.id}>
                        <td>{biblioteca.id}</td>
                        <td>{biblioteca.direccion}</td>
                        <td>
                            <ButtonGroup size="sm">
                            <Button variant='danger' onClick={()=>{
                                fetchs.deleteBiblioteca(biblioteca.id, setListaBibliotecas)
                            }}>Eliminar</Button>
                            <Button style={{ backgroundColor: '#007BFF', color: 'white', border: 'none' }} onClick={()=>fillForm(biblioteca.id)}>Modificar</Button>
                            </ButtonGroup>
                        </td>
                        </tr>
                    ))}
                        
                    </tbody>
                    </Table>
                </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Bibliotecas;