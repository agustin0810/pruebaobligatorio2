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

const Clientes = (props) =>{
    const [listaClientes, setListaClientes] = useState(props.listaClientes);
    const [cliente, setCliente]= useState(null);
    const [msg, setMsg] = useState(null);
    const [success, setSuccess] = useState(null);
  
    const [ci, setCi] = useState(null);
    const [nombreCompleto, setNombreCompleto] = useState(null);

    const fillForm = (idLibro) =>{
        
        fetchs.getCliente(idLibro)
        .then(data => {
          setCliente(data)
          setCi(data.ci)
          setNombreCompleto(data.nombreCompleto)
        })
        .catch(error => {
            // Maneja el error si la promesa es rechazada
            console.error('Error al obtener el cliente:', error);
        });
      }
    
    return(
        <div className='Clientes' style={{marginTop: "5%"}}>
            <Container>
                <Row>
                <Col>
                    <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Ci</Form.Label>
                        <Form.Control value={ci} onChange={(e)=>setCi(e.target.value)} type="number" placeholder="53129242" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre completo</Form.Label>
                        <Form.Control value={nombreCompleto} type="text" onChange={(e)=>setNombreCompleto(e.target.value)} placeholder="Nombre completo" />
                    </Form.Group>
                    <Button 
                        variant="primary" 
                        type="button" 
                        onClick={() => {
                            fetchs.createCliente(ci, nombreCompleto, setListaClientes);
                        }} 
                        style={{ marginTop: '2.5%', width: '30%', marginLeft: '33.33%' }}
                    >
                        Aceptar
                    </Button>

                    </Form>
                </Col>
                <Col>
                    <Table striped bordered hover style={{marginTop: '2.5%'}}>
                    <thead>
                        <tr>
                        <th>Ci</th>
                        <th>Nombre completo</th>
                        </tr>
                    </thead>
                    <tbody>
                    {listaClientes.map((cliente) => (
                        <tr key={cliente.ci}>
                        <td>{cliente.ci}</td>
                        <td>{cliente.nombreCompleto}</td>
                        <td>
                            <ButtonGroup size="sm">
                            <Button variant='danger' onClick={()=>{
                                fetchs.deleteCliente(cliente.ci, setListaClientes)
                            }}>Eliminar</Button>
                            <Button style={{ backgroundColor: '#007BFF', color: 'white', border: 'none' }} onClick={()=>fillForm(cliente.ci)}>Modificar</Button>
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

export default Clientes;