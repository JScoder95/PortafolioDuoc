import React, { Fragment } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { cancelReserve } from '../../actions/departamentos';
import useAuth from '../../hooks/useAuth';
import './TablaReservas.css';

function TablaReservas({ array, setIsLoading }) {
    const { auth } = useAuth(); 

  const handleClickCancelarReserva = (e, id) => { 
    e.preventDefault();
        setIsLoading(true);
        cancelReserve(id, auth?.token).then((res) => {
            setIsLoading(false);
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr> 
          <th>Departamento</th>
          <th>A Nombre de</th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody>
          { array?.map((item, index) => (
            <Fragment key={`item-${index}`}>
              <tr>
                <td>{(item.departamento.nombre)}</td>
                <td>{(item.usuario.nombre)}</td>
                <td className='action__section'>
                  <div className='action__container'>
                  <Button onClick={ (e) => handleClickCancelarReserva(e, item._id)} variant="primary">Cancelar</Button>
                  </div>
                </td> 
              </tr>
            </Fragment>
          ))}
      </tbody>
    </Table>
  );
}

export default TablaReservas;