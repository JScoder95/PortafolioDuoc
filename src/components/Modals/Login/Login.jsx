import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import useAuth from "../../../hooks/useAuth";
import axios from "../../../api/axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import Spiner from "../../Spiner/Spiner";
import { Link } from "react-router-dom";
import "./Login.css";
import "antd/dist/antd.css";

const LOGIN_URL = "/user/login";
const GET_USERS = "/user/";



function Login(props) {
  const { setAuth } = useAuth();
  const { setModalShow, show, setModalCreateAccount } = props;
  const navigate = useNavigate();
  const [rut, setRut] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setErrMsg("");
  }, [rut, password]);

  const handlesetRut = (event) => {
    setRut(event.target.value);
  };

  const handleSetPw = (event) => {
    setPwd(event.target.value);
  };

  const success = () => {
    message.success("Has ingresado correctamente");
  };
  const error = () => {
    message.error("Ha ocurrido un error, verifica tu contraseña");
  };

  const handleClose = () => setModalShow(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = JSON.stringify({ rut, password });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      setIsLoading(true);
      const response = await axios.post(LOGIN_URL, body, config);
      if (response?.data.ok === true) {
        success();
        const accessToken = response?.data?.token;
        setRut("");
        setPwd("");
        setIsValid(true);
        setIsLoading(false);
        setModalShow(false);
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
        localStorage.setItem("auth", JSON.stringify(dataInfo));
        setAuth(dataInfo);
        navigate("/reservas");
      } else {
        error();
        setModalShow(false);
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
        <Modal.Title id="contained-modal-title-vcenter">Ingresar</Modal.Title>
      </Modal.Header>
      {isLoading ? <Spiner /> : (
      <Form className="login__form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="username">Usuario</Form.Label>
          <Form.Control
            type="text"
            id="username"
            autoComplete="off"
            onChange={handlesetRut}
            value={rut}
            required
            placeholder="Enter user"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleSetPw}
            value={password}
            required
          />
        </Form.Group>
        <div  style={{ justifyContent:"space-between", display:'flex' }} >
        <p>
          Necesitas una cuenta?
          <br />
          <span className="line">
            {/*put router link here*/}
            <Link onClick={() => setModalCreateAccount(true)} >Crea una Cuenta</Link>
          </span>
        </p>
        <Button variant="primary" type="submit">
          Ingresar
        </Button>
        </div>
      </Form>
    )}
    </Modal>
  );
}
export default Login;
