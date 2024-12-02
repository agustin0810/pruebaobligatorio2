import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

const Filtros = () => {
    const [titulo, setTitulo] = useState('');
    const [libros, setLibros] = useState([]);
    const [error, setError] = useState(null);

    const buscarLibros = () => {
        // Construir la URL con los filtros
        const url = new URL('http://localhost:5000/libro/filtrarPorTitulo');
        if (titulo) url.searchParams.append('titulo', titulo);

        fetch(url.toString())
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la búsqueda de libros');
                }
                return response.json();
            })
            .then(data => {
                setLibros(data);
                setError(null);
            })
            .catch(err => {
                setError(err.message);
                setLibros([]);
            });
    };

    return (
        <Container style={{ marginTop: '5%' }}>
            <Row>
                <Col>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Buscar por título</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Ingrese el título del libro" 
                                value={titulo} 
                                onChange={(e) => setTitulo(e.target.value)} 
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={buscarLibros}>
                            Buscar
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row style={{ marginTop: '3%' }}>
                <Col>
                    {error ? (
                        <p style={{ color: 'red' }}>{error}</p>
                    ) : (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Código de Barras</th>
                                    <th>Título</th>
                                    <th>Biblioteca</th>
                                </tr>
                            </thead>
                            <tbody>
                                {libros.map((libro) => (
                                    <tr key={libro.codigoBarras}>
                                        <td>{libro.codigoBarras}</td>
                                        <td>{libro.titulo}</td>
                                        <td>{libro.biblioteca ? libro.biblioteca.direccion : 'N/A'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Filtros;
