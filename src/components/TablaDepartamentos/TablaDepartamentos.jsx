import React, { Fragment } from 'react'
import Table from 'react-bootstrap/Table';
import { capitalizeFirstLetter } from '../../common/utils';

function TablaDepartamentos({ array }) {
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
        <tr>
          { array?.map((item, index) => (
            <Fragment key={`item-${index}`}>
              <td>{capitalizeFirstLetter(item.nombre)}</td>
              <td>{capitalizeFirstLetter(item.direccion)}</td>
              <td>{capitalizeFirstLetter(item.ubicacion)}</td>
              <td>{item.banos}</td>
              <td>{item.habitaciones}</td>
              <td>{item.valorArriendo}</td>
              <td>{item.fechaPublicacion}</td>
              <td>{capitalizeFirstLetter(item.disponible)}</td>
              <td></td>
            </Fragment>
          ))}
        </tr>
      </tbody>
    </Table>
  );
}

export default TablaDepartamentos;