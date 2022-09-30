import React, { Fragment } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import useAuth from '../../hooks/useAuth';
import './TablaUsuarios.css';

function TablaUsuarios({ array, setIsLoading, handleOpenPopUp, setSelectedUsuario }) {
  
    const { auth } = useAuth(); 

    const handleClickEditarUsuario = (e, id) => { 
        e.preventDefault();
        setSelectedUsuario(id);
        handleOpenPopUp();
    }

  return (
    <Table striped bordered hover>
      <thead>
        <tr> 
          <th>Nombre</th>
          <th>Rut</th>
          <th>Telefono</th>
          <th>Correo</th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody>
          { array?.map((item, index) => (
            <Fragment key={`item-${index}`}>
              <tr>
                <td>{(item.nombre)}</td>
                <td>{(item.rut)}</td>
                <td>{(item.telefono)}</td>
                <td>{(item.correo)}</td>
                <td className='action__section'>
                  <div className='action__container'>
                    <Button onClick={ (e) => handleClickEditarUsuario(e, item._id)} variant="primary">Editar</Button>
                  </div>
                </td> 
              </tr>
            </Fragment>
          ))}
      </tbody>
    </Table>
  );
}

export default TablaUsuarios;