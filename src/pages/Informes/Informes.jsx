import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "antd/dist/antd.css";
import { TablaGanancias } from "../../components/TablaGanancias/TablaGanancias";

const Informes = () => {
  const { auth } = useAuth();
  const [key, setKey] = useState("informes");
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-1"
    >
      <Tab eventKey="estadisticas" title="Informes y Estadisticas">
        <TablaGanancias/>
      </Tab>
    </Tabs>
  );
};

export default Informes;
