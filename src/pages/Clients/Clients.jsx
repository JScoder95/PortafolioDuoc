import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'antd/dist/antd.css';

const Clients = () => {
  const { auth } = useAuth(); 
  const [key, setKey] = useState('usuarios');
  console.log(auth);
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="usuarios" title="Usuarios">
      </Tab>
    </Tabs>
  )
}

export default Clients