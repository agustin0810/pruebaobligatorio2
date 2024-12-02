import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Alert from 'react-bootstrap/Alert';
import fetchs from './fetchs';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Libros from './components/Libros';
import Bibliotecas from './components/Bibliotecas'; 
import Clientes from './components/Clientes';
import Filtros from './components/Filtros';

function App() {

  const [showLibrosMenu, setShowLibrosMenu] = useState(false);
  const [showBibliotecasMenu, setShowBibliotecasMenu] = useState(false);
  const [showClientesMenu, setShowClientesMenu] = useState(false);
  const [showFiltrosMenu, setShowFiltrosMenu] = useState(false);

  const [listaLibros, setListaLibros] = useState([]);
  const [listaBibliotecas, setListaBibliotecas] = useState([]);
  const [listaClientes, setListaClientes] = useState([])
  const [msg, setMsg] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const handleShowLibrosMenu = () => {
    setShowLibrosMenu(true);
    setShowBibliotecasMenu(false);
    setShowClientesMenu(false);
    setShowFiltrosMenu(false);
  };

  const handleShowBibliotecasMenu = () => {
    setShowLibrosMenu(false);
    setShowBibliotecasMenu(true);
    setShowClientesMenu(false);
    setShowFiltrosMenu(false);

  };

  const handleShowClientesMenu = () => {
    setShowLibrosMenu(false);
    setShowBibliotecasMenu(false);
    setShowClientesMenu(true);
    setShowFiltrosMenu(false);

  };
  const handleShowFiltrosMenu = () => {
    setShowLibrosMenu(false);
    setShowBibliotecasMenu(false);
    setShowClientesMenu(false);
    setShowFiltrosMenu(true);
  };

  useEffect(() => {
    fetchs.listLibros(setListaLibros);
    fetchs.listBibliotecas(setListaBibliotecas);
    fetchs.listClientes(setListaClientes);
  }, []);

  return (
    <div className="App">
      <Navbar bg="primary" data-bs-theme="dark" expand="sm">
        <Container>
          <Navbar.Brand href="#home">Libros, Bibliotecas y Clientes</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={handleShowLibrosMenu}>Libro</Nav.Link>
            <Nav.Link onClick={handleShowBibliotecasMenu}>Biblioteca</Nav.Link>
            <Nav.Link onClick={handleShowClientesMenu}>Cliente</Nav.Link>
            <Nav.Link onClick={handleShowFiltrosMenu}>Filtros</Nav.Link>

          </Nav>
        </Container>
      </Navbar>

      {success ? (
        <Alert
          variant={"success"}
          style={{ width: "30%", margin: 'auto', marginTop: '2.5%', textAlign: "center" }}
        >
          {msg}
        </Alert>
      ) : null}
      {success != null && !success ? (
        <Alert
          variant={"danger"}
          style={{ width: "30%", margin: 'auto', marginTop: '2.5%', textAlign: "center" }}
        >
          {msg}
        </Alert>
      ) : null}

      {showLibrosMenu ? (
        <Libros
          listaBibliotecas={listaBibliotecas}
          listaLibros={listaLibros}
        />
      ) : null}
      
      {showBibliotecasMenu ? (
        <Bibliotecas listaBibliotecas={listaBibliotecas} listaClientes={listaClientes} />
      ) : null}
      {showClientesMenu ? (
        <Clientes listaClientes={listaClientes} />
      ) : null}
      {showFiltrosMenu ? (
        <Filtros />
      ) : null}
    </div>
  );
}

export default App;
