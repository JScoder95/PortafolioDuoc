import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "../../api/axios";
import TablaReservas from "../../components/TablaReservas/TablaReservas";
const GET_RESERVAS_URL = "/reservas/";

const Reservas = () => {
  const { auth } = useAuth();
  const [key, setKey] = useState("reservas");
  const [reservas, setReservas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    if (key === "reservas") {
      async function fetchReservas() {
        const token = {
          headers: {
            "Content-Type": "application/json",
            "x-token": auth?.token,
          },
        };
        const response = await axios.get(GET_RESERVAS_URL, token);
        setReservas(response?.data?.reservas);
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
        />
      </Tab>
      {auth?.usuario?.rol === "Administrador" ? (
        <Tab eventKey="transporte" title="Asignar Transporte"></Tab>
      ) : null}
    </Tabs>
  );
};

export default Reservas;
