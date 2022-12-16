import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import useAuth from "../../../hooks/useAuth";
import axios from "../../../api/axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import "./CreateAccount.css";
import "antd/dist/antd.css";
const CREATE_URL = "/user/create";
const GET_USERS = "/user/";

function CreateAccount(props) {
  const { setAuth } = useAuth();
  const { setModalCreateAccount, show } = props;
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [password, setPwd] = useState("");
  const [nombre, setNombre] = useState("");
  const [rut, setRut] = useState("");
  const [rol, setRol] = useState("Cliente");
  const [telefono, setTelefono] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleSetCorreo = (event) => {
    setCorreo(event.target.value);
  };

  const handleSetPw = (event) => {
    setPwd(event.target.value);
  };

  const handleSetNombre = (event) => {
    setNombre(event.target.value);
  };

  const handleSetRut = (event) => {
    setRut(event.target.value);
  };
  const handleSetTelefono = (event) => {
    setTelefono(event.target.value);
  };

  const success = () => {
    message.success("¡Felicidades, Tu cuenta se ha creado exitosamente!");
  };
  const error = () => {
    message.error("Ha ocurrido un error, verifica los datos.");
  };

  const handleClose = () => setModalCreateAccount(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = JSON.stringify({ rut, password, nombre, correo, telefono, rol });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(CREATE_URL, body, config);
      if (response?.data.ok === true) {
        success();
        const accessToken = response?.data?.token;
        setRut("");
        setPwd("");
        setIsValid(true);
        setModalCreateAccount(false);
        const token = {
          headers: {
            "x-token": accessToken,
          },
        };
        const response2 = await axios.get(GET_USERS, token);
        const dataInfo = {
          usuario: response2.data.usuario,
          token: accessToken,
        };
        setAuth(dataInfo);
        navigate("/reservas");
      } else {
        error();
        setModalCreateAccount(false);
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Crear Cuenta
        </Modal.Title>
      </Modal.Header>
      <Form className="login__form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">E-mail</Form.Label>
          <Form.Control
            type="email"
            id="email"
            autoComplete="off"
            onChange={handleSetCorreo}
            value={correo}
            required
            placeholder="Ingresa tu Correo"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa tu contraseña"
            id="password"
            onChange={handleSetPw}
            value={password}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="nombre">Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu Nombre"
            id="nombre"
            onChange={handleSetNombre}
            value={nombre}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="rut">Rut</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingresa tu Rut"
            id="rut"
            onChange={handleSetRut}
            value={rut}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="telefono">Telefono</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingresa tu Telefono"
            id="telefono"
            onChange={handleSetTelefono}
            value={telefono}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Crear Cuenta
        </Button>
      </Form>
    </Modal>
  );
}
export default CreateAccount;
