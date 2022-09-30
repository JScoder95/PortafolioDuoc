import React, { useState, Fragment } from 'react';
import useAuth from '../../hooks/useAuth';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from '../../api/axios';
import TablaDepartamentos from '../../components/TablaDepartamentos/TablaDepartamentos';
import Spiner from '../../components/Spiner/Spiner'
import 'antd/dist/antd.css';
import ReservarModal from '../ReservarModal/ReservarModal';
const GET_DEPARTAMENTOS_URL = '/depto/'

const Departamentos = () => {
  const { auth } = useAuth(); 
  const [key, setKey] = useState('departamentos');
  const [departamentos, setdepartamentos] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [modalReservas, setModalReservas] = React.useState(false);
  const [selectedDepto, setSelectedDepto] = React.useState("");

  const handleClose = () => {
    setModalReservas(false);
  }
  const handleOpenPopUp = () => {
    setModalReservas(true);
  }

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
      console.log(auth);
      setIsLoading(false)
      }
      fetchDepartamentos();
    }
  }, [key, isLoading]);

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="departamentos" title="Departamentos">
        { !isLoading ? 
            <Fragment>
              <TablaDepartamentos array={departamentos} handleOpenPopUp={handleOpenPopUp} setSelectedDepto={setSelectedDepto}/>
              <ReservarModal show={modalReservas} handleClose={handleClose} selectedDepto={selectedDepto} setIsLoading={setIsLoading} />
            </Fragment>  
            : <Spiner /> 
        }
      </Tab>
      { auth?.usuario?.rol === "Administrador" ?   <Tab eventKey="mantenciones" title="Mantenciones"></Tab> : null }
    </Tabs>
  )
}

export default Departamentos