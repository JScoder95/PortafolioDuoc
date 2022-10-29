import React, { useState, Fragment } from "react";
import useAuth from "../../hooks/useAuth";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "../../api/axios";
import TablaDepartamentos from "../../components/TablaDepartamentos/TablaDepartamentos";
import Spiner from "../../components/Spiner/Spiner";
import ReservarModal from "../../components/Modals/ReservarModal/ReservarModal";
import EditarDepartamentoModal from "../../components/Modals/EditarDepartamentoModal/EditarDepartamentoModal";
import Button from "react-bootstrap/Button";
import AñadirDepartamentoModal from "../../components/Modals/AñadirDepartamentoModal/AñadirDepartamentoModal";
const GET_DEPARTAMENTOS_URL = "/depto/";

const Departamentos = () => {
  const { auth } = useAuth();
  const [key, setKey] = useState("departamentos");
  const [departamentos, setdepartamentos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalReservas, setModalReservas] = React.useState(false);
  const [modalEditar, setModalEditar] = React.useState(false);
  const [modalAñadir, setModalAñadir] = React.useState(false);
  const [selectedDepto, setSelectedDepto] = React.useState("");

  const handleClose = () => {
    setModalReservas(false);
    setModalEditar(false);
    setModalAñadir(false);
  };
  const handleOpenReserve = () => {
    setModalReservas(true);
  };
  const handleOpenEdit = () => {
    setModalEditar(true);
  };

  const handleClickAddDepartment = () => {
    setModalAñadir(true);
  };

  React.useEffect(() => {
    if (key === "departamentos") {
      async function fetchDepartamentos() {
        const token = {
          headers: {
            "Content-Type": "application/json",
            "x-token": auth?.token,
          },
        };
        const response = await axios.get(GET_DEPARTAMENTOS_URL, token, {
          data: { rol: auth?.usuario?.rol },
        });
        setdepartamentos(response?.data.postDepto);
        setIsLoading(false);
      }
      fetchDepartamentos();
    }
  }, [key, isLoading, auth]);

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      {auth ? (
        <Tab eventKey="departamentos" title="Departamentos">
          {!isLoading ? (
            <Fragment>
              <Button
                className="ms-2 me-2 mt-2 mb-2"
                onClick={(e) => handleClickAddDepartment(e)}
                variant="primary"
              >
                Añadir Departamento
              </Button>
              <TablaDepartamentos
                array={departamentos}
                handleOpenEdit={handleOpenEdit}
                handleOpenReserve={handleOpenReserve}
                setSelectedDepto={setSelectedDepto}
                setIsLoading={setIsLoading}
              />
              <ReservarModal
                show={modalReservas}
                handleClose={handleClose}
                selectedDepto={selectedDepto}
                setIsLoading={setIsLoading}
              />
              <AñadirDepartamentoModal
                show={modalAñadir}
                handleClose={handleClose}
                setIsLoading={setIsLoading}
              />
              <EditarDepartamentoModal
                show={modalEditar}
                handleClose={handleClose}
                selectedDepto={selectedDepto}
                setIsLoading={setIsLoading}
              />
            </Fragment>
          ) : (
            <Spiner />
          )}
        </Tab>
      ) : null}
      {auth?.usuario?.rol === "Administrador" ? (
        <Tab eventKey="mantenciones" title="Mantenciones"></Tab>
      ) : null}
    </Tabs>
  );
};

export default Departamentos;
