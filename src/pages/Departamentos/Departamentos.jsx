import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'antd/dist/antd.css';

const Departamentos = () => {
  const { auth } = useAuth(); 
  const [key, setKey] = useState('departamentos');
  console.log(auth);
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="departamentos" title="Departamentos">
      </Tab>
      <Tab eventKey="mantenciones" title="Mantenciones">
      </Tab>
     
    </Tabs>
  )
}

export default Departamentos