import React, { useState, Fragment } from "react";
import useAuth from "../../hooks/useAuth";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "../../api/axios";
import TablaDepartamentos from "../../components/TablaDepartamentos/TablaDepartamentos";
import TablaDepartamentosCliente from "../../components/TablaDepartamentosCliente/TablaDepartamentosCliente";
import Spiner from "../../components/Spiner/Spiner";
import EditarDepartamentoModal from "../../components/Modals/EditarDepartamentoModal/EditarDepartamentoModal";
import EditarInventarioDepartamentoModal from '../../components/Modals/EditarInventarioDepartamentoModal/EditarInventarioDepartamentoModal'
import Button from "react-bootstrap/Button";
import AñadirDepartamentoModal from "../../components/Modals/AñadirDepartamentoModal/AñadirDepartamentoModal";
const GET_DEPARTAMENTOS_URL = "/depto/";

const Departamentos = () => {
  const { auth } = useAuth();
  const [key, setKey] = useState("departamentos");
  const [departamentos, setdepartamentos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalEditar, setModalEditar] = React.useState(false);
  const [modalEditarInventario, setModalEditarInventario] = React.useState(false);
  const [modalAñadir, setModalAñadir] = React.useState(false);
  const [selectedDepto, setSelectedDepto] = React.useState("");

  const handleClose = () => {;
    setModalEditar(false);
    setModalAñadir(false);
    setModalEditarInventario(false);
  };
  const handleOpenEdit = () => {
    setModalEditar(true);
  };
  const handleOpenEditInventory = () => {
    setModalEditarInventario(true);
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
        console.log(response?.data.postDepto)
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
              { auth?.usuario?.rol === "Administrador" ? 
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
                handleOpenEditInventory={handleOpenEditInventory}
                setSelectedDepto={setSelectedDepto}
                setIsLoading={setIsLoading}
                window="departamentos"
                disponible="si"
              />
              </Fragment>
              : 
              <TablaDepartamentosCliente
                array={departamentos}
                handleOpenEdit={handleOpenEdit}
                handleOpenEditInventory={handleOpenEditInventory}
                setSelectedDepto={setSelectedDepto}
                setIsLoading={setIsLoading}
                window="departamentos"
                disponible="si"
              />}
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
              <EditarInventarioDepartamentoModal
                show={modalEditarInventario}
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
        <Tab eventKey="mantenciones" title="Mantenciones">
           {!isLoading ? (
            <Fragment>
              <TablaDepartamentos
                array={departamentos}
                handleOpenEdit={handleOpenEdit}
                handleOpenEditInventory={handleOpenEditInventory}
                setSelectedDepto={setSelectedDepto}
                setIsLoading={setIsLoading}
                window="mantenciones"
                disponible="no"
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
                setKey={setKey}
              />
              <EditarInventarioDepartamentoModal
                show={modalEditarInventario}
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
    </Tabs>
  );
};

export default Departamentos;
