import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "antd/dist/antd.css";

const Informes = () => {
  const { auth } = useAuth();
  const [key, setKey] = useState("informes");
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="informes" title="Informes"></Tab>
      <Tab eventKey="estadisticas" title="Estadisticas"></Tab>
      <Tab eventKey="pagos" title="Pagos"></Tab>
    </Tabs>
  );
};

export default Informes;
