import React, { Fragment } from 'react'
import Table from 'react-bootstrap/Table';
import { capitalizeFirstLetter, formatDate, MoneyFormatter } from '../../common/utils';
import Button from 'react-bootstrap/Button';
import './TablaDepartamentos.css';

function TablaDepartamentos({ array, handleOpenPopUp, setSelectedDepto }) {

  const handleClickReservar = (e, id, price) => {
    handleOpenPopUp();
    setSelectedDepto(id);
    console.log(id, price); 
    e.preventDefault();
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr> 
          <th>Nombre</th>
          <th>Dirección</th>
          <th>Ubicación</th>
          <th>Baños</th>
          <th>Habitaciones</th>
          <th>Valor Arriendo</th>
          <th>Fecha Publicación</th>
          <th>Disponible</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
          { array?.map((item, index) => (
            <Fragment key={`item-${index}`}>
              <tr>
                <td>{capitalizeFirstLetter(item.nombre)}</td>
                <td>{capitalizeFirstLetter(item.direccion)}</td>
                <td>{capitalizeFirstLetter(item.ubicacion)}</td>
                <td>{item.banos}</td>
                <td>{item.habitaciones}</td>
                <td>{MoneyFormatter(item.valorArriendo)}</td>
                <td>{formatDate(item.fechaPublicacion)}</td>
                <td className='available__department'>
                  <div style={{ backgroundColor: item.disponible === "si" ? "#009906" : "#ef2522" }} className='available__color'>
                  </div>
                </td>
                <td className='action__section'>
                  <div className='action__container'>
                  <Button onClick={ (e) => handleClickReservar(e, item)} variant="primary">Reservar</Button>
                  </div>
                </td> 
              </tr>
            </Fragment>
          ))}
      </tbody>
    </Table>
  );
}

export default TablaDepartamentos;