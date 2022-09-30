import React, { useState, Fragment } from 'react';
import useAuth from '../../hooks/useAuth';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from '../../api/axios';
import TablaUsuarios from '../../components/TablaUsuarios/TablaUsuarios';
import EditarUsuarioModal from '../EditarUsuarioModal/EditarUsuarioModal';
import Spiner from '../../components/Spiner/Spiner';
const GET_USUARIOS_URL = '/user/usuariosCreados'

const Clients = () => {
  const { auth } = useAuth(); 
  const [key, setKey] = useState('usuarios');
  const [isLoading, setIsLoading] = useState(true);
  const [usuarios, setUsuarios] = useState([])
  const [modalUsuario, setModalUsuario] = React.useState(false);
  const [selectedUsuario, setSelectedUsuario] = React.useState("");

  const handleClose = () => {
    setModalUsuario(false);
  }
  const handleOpenPopUp = () => {
    setModalUsuario(true);
  }

  React.useEffect(() => {
    if( key === 'usuarios'){
      async function fetchUsuarios() {
      const token = {
        headers: {
          'Content-Type': 'application/json',
          'x-token': auth?.token,
        },
      };
      const response = await axios.get(GET_USUARIOS_URL, token);
      setUsuarios(response?.data?.usuarios);
      setIsLoading(false)
      }
      fetchUsuarios();
    }
  }, [key, isLoading]);

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="usuarios" title="Usuarios">
      { !isLoading ? 
            <Fragment>
              <TablaUsuarios array={usuarios} handleOpenPopUp={handleOpenPopUp} setSelectedUsuario={setSelectedUsuario}/>
              <EditarUsuarioModal show={modalUsuario} handleClose={handleClose} setSelectedUsuario={setSelectedUsuario} selectedUsuario={selectedUsuario} setIsLoading={setIsLoading} />
            </Fragment>  
            : <Spiner /> 
        }
      </Tab>
    </Tabs>
  )
}

export default Clients