import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'antd/dist/antd.css';

const Reservas = () => {
  const { auth } = useAuth(); 
  const [key, setKey] = useState('reservas');
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="reservas" title="Reservas">
      </Tab>
      {
        auth?.usuario?.rol === "Administrador" ? <Tab eventKey="transporte" title="Asignar Transporte"></Tab> : null
      }
      
    </Tabs>
  )
}

export default Reservas;