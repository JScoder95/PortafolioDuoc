import React, { Fragment, useEffect } from "react";
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
  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("auth")));
  }, []);

  const authLocal =
    auth == {} ? auth : JSON.parse(localStorage.getItem("auth"));
  // const localAuth = JSON.parse(localStorage.getItem("auth"));
  return (
    <Navbar className="navbar__page" sticky="top" bg="light" expand="lg">
      <Container fluid className="header">
        <div className="left">
          <Navbar.Toggle aria-controls="navbarScroll" />
          <div className="title">
            <Nav.Link className="brand__link" as={NavLink} to="/">
              TurismoReal
            </Nav.Link>
          </div>
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              {auth?.usuario?.rol === "Funcionario" ? (
                <Nav.Link as={NavLink} className="nav-link" to="reservas">
                  Reservas
                </Nav.Link>
              ) : auth?.usuario?.rol === "Administrador" ? (
                <Fragment>
                  <Nav.Link as={NavLink} className="nav-link" to="reservas">
                    Reservas
                  </Nav.Link>
                  <Nav.Link as={NavLink} className="nav-link" to="clients">
                    Usuarios
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    className="nav-link"
                    to="departamentos"
                  >
                    Departamentos
                  </Nav.Link>
                  <Nav.Link as={NavLink} className="nav-link" to="informes">
                    Informes
                  </Nav.Link>
                </Fragment>
              ) : (
                <div>
                  <Nav.Link as={NavLink} className="nav-link" to="reservas">
                    Reservas
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    className="nav-link"
                    to="departamentos"
                  >
                    Departamentos
                  </Nav.Link>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
        <div className="right">
          {auth?.usuario?._id ? (
            <Fragment>
              <Navbar.Text className="navbar-me">
                {auth ? `Bienvenido ${auth?.usuario?.nombre}` : null}
              </Navbar.Text>
              <Button
                variant="primary"
                onClick={handleLogOut}
                className="button-header"
              >
                Cerrar Sesión
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Button
                className="button-header"
                variant="primary"
                onClick={() => setModalLogin(true)}
              >
                Ingresar
              </Button>
              <Button
                variant="secondary"
                onClick={() => setModalCreateAccount(true)}
                className="button-header"
              >
                Crear Cuenta
              </Button>
            </Fragment>
          )}
          <Login
            show={modalLogin}
            setModalShow={setModalLogin}
            onHide={() => setModalLogin(false)}
            setModalCreateAccount={setModalCreateAccount}
          />
          <CreateAccount
            show={modalCreateAccount}
            setModalCreateAccount={setModalCreateAccount}
            onHide={() => setModalCreateAccount(false)}
            setModalLogin={setModalLogin}
          />
        </div>
      </Container>
    </Navbar>
  );
};

export default NavScrollExample;
