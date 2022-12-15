import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "../../api/axios";
import TablaReservas from "../../components/TablaReservas/TablaReservas";
import TablaAsignarTransporte from "../../components/TablaAsignarTransporte/TablaAsignarTransporte";
import AsignarTransporteModal from "../../components/Modals/AsignarTransporteModal/AsignarTransporteModal";
import CheckOutModal from "../../components/Modals/CheckOutModal/CheckOutModal";
import CheckInModal from "../../components/Modals/CheckInModal/CheckInModal";
import PagoModalFuncionario from "../../components/Modals/PagoModalFuncionario/PagoModalFuncionario";

const GET_RESERVAS_URL = "/reservas/";
const GET_TRANSPORTE_URL = "/reservas/transporte/63995b8dc0e9b97cbe72feff";

const Reservas = () => {
  const { auth } = useAuth();
  const authLocal =
    auth == {} ? auth : JSON.parse(localStorage.getItem("auth"));
  const [key, setKey] = useState("reservas");
  const [reservas, setReservas] = useState([]);
  const [transporte, setTransporte] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalCheckIn, setModalCheckIn] = useState(false);
  const [modalCheckOut, setModalCheckOut] = useState(false);
  const [modalTransporte, setModalTransporte] = useState(false);
  const [modalPago, setModalPago] = useState(false);
  const [selectedDepto, setSelectedDepto] = useState("");
  localStorage.removeItem("reservaID");
  const handleClose = () => {
    setModalCheckIn(false);
    setModalCheckOut(false);
    setModalTransporte(false);
    setModalPago(false);
  };
  const handleOpenCheckIn = (e, item) => {
    e.preventDefault();
    setModalCheckIn(true);
    setSelectedDepto(item);
    console.log(item);
  };
  const handleOpenCheckOut = (e, item) => {
    e.preventDefault();
    setModalCheckOut(true);
    setSelectedDepto(item);
    console.log(item);
  };

  const handleOpenAsignarTransporte = (e, item) => {
    e.preventDefault();
    setModalTransporte(true)
    setSelectedDepto(item);
    console.log(item);
  }
  const handleOpenPago = (e, item) => {
    e.preventDefault();
    setModalPago(true)
    setSelectedDepto(item);
    console.log(item);
  }

  React.useEffect(() => {
    if (key === "reservas") {
      async function fetchReservas() {
        const token = {
          headers: {
            "Content-Type": "application/json",
            "x-token": authLocal?.token,
          },
        };
        const response = await axios.get(GET_RESERVAS_URL, token);
        setReservas(response?.data?.reservas);
        setIsLoading(false);
      }
      fetchReservas();
    }
  }, [key, isLoading]);
  React.useEffect(() => {
    if (key === "transporte") {
      async function fetchReservas() {
        const token = {
          headers: {
            "Content-Type": "application/json",
            "x-token": authLocal?.token,
          },
        };
        const response = await axios.get(GET_TRANSPORTE_URL, token);
        setTransporte(response?.data?.reservaDB);
        setIsLoading(false);
      }
      fetchReservas();
    }
  }, [key, isLoading]);

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-2"
    >
      <Tab eventKey="reservas" title="Reservas">
        <TablaReservas
          array={reservas}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          handleOpenCheckIn={handleOpenCheckIn}
          handleOpenCheckOut={handleOpenCheckOut}
          handleOpenPago={handleOpenPago}
        />
        <CheckOutModal
          show={modalCheckOut}
          setIsLoading={setIsLoading}
          handleClose={handleClose}
          selectedDepto={selectedDepto}
        />
        <CheckInModal
          show={modalCheckIn}
          setIsLoading={setIsLoading}
          handleClose={handleClose}
          selectedDepto={selectedDepto}
        />
        <PagoModalFuncionario
          show={modalPago}
          setIsLoading={setIsLoading}
          handleClose={handleClose}
          selectedDepto={selectedDepto}
        />
      </Tab>
      {authLocal?.usuario?.rol === "Administrador" ? (
        <Tab eventKey="transporte" title="Asignar Transporte">
          <TablaAsignarTransporte
            array={transporte}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            handleOpenAsignarTransporte={handleOpenAsignarTransporte}
          />
          <AsignarTransporteModal 
            show={modalTransporte}
            handleClose={handleClose}
            selectedDepto={selectedDepto}
          />
        </Tab>
      ) : null}
    </Tabs>
  );
};

export default Reservas;
