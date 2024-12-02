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

const Libros = (props) =>{
    const [listaLibros, setListaLibros] = useState(props.listaLibros);
    const [listaBibliotecas, setListaBibliotecas] = useState(props.listaBibliotecas);
    const [libro, setLibro]= useState(null);
    const [msg, setMsg] = useState(null);
    const [success, setSuccess] = useState(null);
  
    const [codLibro, setCodLibro] = useState(null);
    const [titulo, setTitulo] = useState(null);
    const [biblioteca, setBiblioteca] = useState(null);
    const [bibliotecaId, setBibliotecaId] = useState(null);

    const fillForm = (idLibro) =>{
        
        fetchs.getLibro(idLibro)
        .then(data => {
          setLibro(data)
          setCodLibro(data.codigoBarras)
          setTitulo(data.titulo)
          setBibliotecaId(data.biblioteca.id)
          setBiblioteca(data.biblioteca)
        })
        .catch(error => {
            // Maneja el error si la promesa es rechazada
            console.error('Error al obtener el libro:', error);
        });
      }
    
    return(
        <div className='Libros' style={{marginTop: "5%"}}>
            <Container>
                <Row>
                <Col>
                    <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Código de barras</Form.Label>
                        <Form.Control value={codLibro} onChange={(e)=>setCodLibro(e.target.value)} type="number" placeholder="12345678" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Título</Form.Label>
                        <Form.Control value={titulo} type="text" onChange={(e)=>setTitulo(e.target.value)} placeholder="Título" />
                    </Form.Group>
                    {console.log(biblioteca)}
                    <Form.Select 
                        value={bibliotecaId || ""} // Muestra una opción predeterminada si no hay valor
                        aria-label="Biblioteca" 
                        onChange={(e) => setBibliotecaId(e.target.value)}
                    >
                        <option value="" disabled>Seleccione una biblioteca</option>
                        {listaBibliotecas.map((biblioteca) => (
                            <option key={biblioteca.id} value={biblioteca.id}>
                                {biblioteca.id + ", " + biblioteca.direccion}
                            </option>
                        ))}
                    </Form.Select>

                    <Button 
                        variant="primary" 
                        type="button" 
                        onClick={() => {
                            if (!bibliotecaId) {
                                setMsg("Debe seleccionar una biblioteca");
                                setSuccess(false);
                            } else {
                                fetchs.createLibro(codLibro, titulo, bibliotecaId, setMsg, setSuccess, setListaLibros);
                            }
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
                        <th>Código</th>
                        <th>Título</th>
                        <th>Biblioteca</th>
                        <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {listaLibros.map((libro) => (
                        <tr key={libro.codigoBarras}>
                        <td>{libro.codigoBarras}</td>
                        <td>{libro.titulo}</td>
                        <td>{libro.biblioteca?libro.biblioteca.id:"N/A"}</td>
                        <td>
                            <ButtonGroup size="sm">
                            <Button variant='danger' onClick={()=>{
                                fetchs.deleteLibro(libro.codigoBarras, setMsg, setSuccess, setListaLibros)
                            }}>Eliminar</Button>
                            <Button style={{ backgroundColor: '#007BFF', color: 'white', border: 'none' }} onClick={()=>fillForm(libro.codigoBarras)}>Modificar</Button>
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

export default Libros;