import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from '../../api/axios';
import TablaDepartamentos from '../../components/TablaDepartamentos/TablaDepartamentos';
import Spiner from '../../components/Spiner/Spiner'
import 'antd/dist/antd.css';
const GET_DEPARTAMENTOS_URL = '/depto/'

const Departamentos = () => {
  const { auth } = useAuth(); 
  const [key, setKey] = useState('departamentos');
  const [departamentos, setdepartamentos] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    if( key === 'departamentos'){
      async function fetchDepartamentos() {
      const token = {
        headers: {
          'Content-Type': 'application/json',
          'x-token': auth?.token,
        },
      };
      const response = await axios.get(GET_DEPARTAMENTOS_URL, token, { data : { "rol" : auth?.usuario?.rol } });
      setdepartamentos(response?.data.postDepto);
      setIsLoading(false)
      console.log(response?.data.postDepto);
      }
      fetchDepartamentos();
    }
  }, [key]);

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="departamentos" title="Departamentos">
        { !isLoading ?  <TablaDepartamentos array={departamentos} /> : <Spiner /> }
      </Tab>
      { auth?.usuario?.rol === "Administrador" ?   <Tab eventKey="mantenciones" title="Mantenciones"></Tab> : null }
    </Tabs>
  )
}

export default Departamentos