import React, { Fragment } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import useAuth from '../../hooks/useAuth';
import './TablaUsuarios.css';

function TablaUsuarios({ array, setIsLoading, handleOpenPopUp, setSelectedUsuario }) {
  
    const { auth } = useAuth(); 

    const handleClickEditarUsuario = (e, item) => { 
        e.preventDefault();
        setSelectedUsuario(item);
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
                <td>  <i
                  className="bx bx-user"
                  style={{ color: "RGB(134 96 212)" }}
                ></i> {(item.nombre)}</td>
                <td> <i
                  className="bx bx-id-card"
                  style={{ color: "RGB(124 183 81)" }}
                ></i> {(item.rut)}</td>
                <td> <i
                  className="bx bx-phone"
                  style={{ color: "RGB(9 169 177)" }}
                ></i> {(item.telefono)}</td>
                <td> <i
                  className="bx bx-mail-send"
                  style={{ color: "RGB(197 45 45)" }}
                ></i>{(item.correo)}</td>
                <td className='action__section'>
                  <div className='action__container'>
                    <Button onClick={ (e) => handleClickEditarUsuario(e, item)} variant="primary" className='action__button'>Editar</Button>
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