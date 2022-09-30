import React, { Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Login from '../../pages/Login/Login';
import useAuth from '../../hooks/useAuth';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './Header.css';

const NavScrollExample = () => {
  const { auth, setAuth } = useAuth();
    const [modalShow, setModalShow] = React.useState(false);
    const navigate = useNavigate();
    const handleLogOut = () => {
      setAuth(null);
      navigate("/departamentos")
    }
  return (
    <Navbar className='navbar__page' sticky="top" bg="light" expand="lg">
      <Container fluid>
        <Nav.Link className='brand__link' as={NavLink} to="/">TurismoReal</Nav.Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            { auth?.usuario?.rol === "Funcionario" ? <Nav.Link as={NavLink} to="reservas">Reservas</Nav.Link>  
              : auth?.usuario?.rol === "Administrador" ? 
                <Fragment>
                  <Nav.Link as={NavLink} to="reservas">Reservas</Nav.Link>
                  <Nav.Link as={NavLink} to="clients">Usuarios</Nav.Link>
                  <Nav.Link as={NavLink} to="departamentos">Departamentos</Nav.Link>
                  <Nav.Link as={NavLink} to="informes">Informes</Nav.Link>
                </Fragment> 
                : 
                <Fragment>
                  <Nav.Link as={NavLink} to="reservas">Reservas</Nav.Link>
                  <Nav.Link as={NavLink} to="departamentos">Departamentos</Nav.Link>
                </Fragment> 
            }
          </Nav>
        </Navbar.Collapse>
        { auth?.usuario?._id ? 
          <Fragment>
            <Navbar.Text className='me-4'>
              { auth ? `Bienvenido ${auth?.usuario?.nombre}` : null}
            </Navbar.Text>
            <Button variant="primary" onClick={handleLogOut}>
              Cerrar Sesion
            </Button> 
          </Fragment>
          :
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Ingresar
          </Button>  
        }
        <Login show={modalShow} setModalShow={setModalShow} onHide={() => setModalShow(false)}/>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;