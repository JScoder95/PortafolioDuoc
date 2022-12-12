import React, { Fragment } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Login from "../../components/Modals/Login/Login";
import useAuth from "../../hooks/useAuth";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import CreateAccount from "../Modals/CreateAccount/CreateAccount";

const NavScrollExample = () => {
  const { auth, setAuth } = useAuth();
  const [modalLogin, setModalLogin] = React.useState(false);
  const [modalCreateAccount, setModalCreateAccount] = React.useState(false);
  const navigate = useNavigate();
  const handleLogOut = () => {
    setAuth(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("reservaID");
    navigate("/departamentos");
  };
  const localAuth = JSON.parse(localStorage.getItem("auth"));
  return (
    <Navbar className="navbar__page" sticky="top" bg="light" expand="lg">
      <Container fluid>
        <Nav.Link className="brand__link" as={NavLink} to="/">
          TurismoReal
        </Nav.Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {auth?.usuario?.rol === "Funcionario" ? (
              <Nav.Link as={NavLink} to="reservas">
                Reservas
              </Nav.Link>
            ) : auth?.usuario?.rol === "Administrador" ? (
              <Fragment>
                <Nav.Link as={NavLink} to="reservas">
                  Reservas
                </Nav.Link>
                <Nav.Link as={NavLink} to="clients">
                  Usuarios
                </Nav.Link>
                <Nav.Link as={NavLink} to="departamentos">
                  Departamentos
                </Nav.Link>
                <Nav.Link as={NavLink} to="informes">
                  Informes
                </Nav.Link>
              </Fragment>
            ) : (
              <Fragment>
                <Nav.Link as={NavLink} to="reservas">
                  Reservas
                </Nav.Link>
                <Nav.Link as={NavLink} to="departamentos">
                  Departamentos
                </Nav.Link>
              </Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
        {auth?.usuario?._id ? (
          <Fragment>
            <Navbar.Text className="me-4">
              {auth ? `Bienvenido ${auth?.usuario?.nombre}` : null}
            </Navbar.Text>
            <Button variant="primary" onClick={handleLogOut}>
              Cerrar Sesion
            </Button>
          </Fragment>
        )  : localAuth?.usuario?._id ?(
          <Fragment>
            <Navbar.Text className="me-4">
              {localAuth ? `Bienvenido ${localAuth?.usuario?.nombre}` : null}
            </Navbar.Text>
            <Button variant="primary" onClick={handleLogOut}>
              Cerrar Sesion
            </Button>
          </Fragment>
        ): (
          <Fragment>
            <Button
              className="me-2"
              variant="primary"
              onClick={() => setModalLogin(true)}
            >
              Ingresar
            </Button>
            <Button
              variant="secondary"
              onClick={() => setModalCreateAccount(true)}
            >
              Crear Cuenta
            </Button>
          </Fragment>
        )}
        <Login
          show={modalLogin}
          setModalShow={setModalLogin}
          onHide={() => setModalLogin(false)}
        />
        <CreateAccount
          show={modalCreateAccount}
          setModalCreateAccount={setModalCreateAccount}
          onHide={() => setModalCreateAccount(false)}
        />
      </Container>
    </Navbar>
  );
};

export default NavScrollExample;
