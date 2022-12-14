import React, { Fragment, useEffect } from "react";
import Table from "react-bootstrap/Table";

import { Link } from "react-router-dom";

import {
  capitalizeFirstLetter,
  formatDate,
  MoneyFormatter,
} from "../../common/utils";
import Button from "react-bootstrap/Button";
import useAuth from "../../hooks/useAuth";
import "./TablaDepartamentos.css";
import { deleteDepartment } from "../../actions/departamentos";

function TablaDepartamentos({
  array,
  setSelectedDepto,
  setIsLoading,
  handleOpenEdit,
  handleOpenEditInventory,
  handleOpenReserve,
  disponible,
  window
}) {
  const { auth } = useAuth();
  const authLocal = ( auth=={} ? auth : JSON.parse(localStorage.getItem("auth"))  ) ;

  const handleClickReservar = (e, id, price) => {
    handleOpenReserve();
    setSelectedDepto(id);
    console.log(id, price);
    e.preventDefault();
  };

  const handleClickEditDepartment = (e, id) => {
    e.preventDefault();
    handleOpenEdit();
    setSelectedDepto(id);
    console.log(id);
  };
  const handleClickEditInventoryDepartment = (e, id) => {
    e.preventDefault();
    handleOpenEditInventory();
    setSelectedDepto(id);
    console.log(id);
  };

  const handleClickDeleteDepartment = (e, item) => {
    e.preventDefault();
    console.log(item._id);
    setIsLoading(true);
    deleteDepartment(item._id, authLocal?.token)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
console.log(array)
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
        {array?.filter(item =>  item.disponible === disponible).map((item, index) => (
          <Fragment key={`item-${index}`}>
            <tr>
              <td>{capitalizeFirstLetter(item.nombre)}</td>
              <td>{capitalizeFirstLetter(item.direccion)}</td>
              <td>{capitalizeFirstLetter(item.ubicacion)}</td>
              <td>{item.banos}</td>
              <td>{item.habitaciones}</td>
              <td>{MoneyFormatter(item.valorArriendo)}</td>
              <td>{formatDate(item.fechaPublicacion)}</td>
              <td className="available__department">
                <div
                  style={{
                    backgroundColor:
                      item.disponible === "si" ? "#009906" : "#ef2522",
                  }}
                  className="available__color"
                ></div>
              </td>
              <td className="action__section">
                <div className="action__container">
                  {authLocal?.usuario?.rol === "Administrador" ? (
                    <Fragment>
                      <Button
                        className="me-4"
                        onClick={(e) => handleClickEditDepartment(e, item)}
                        variant="primary"
                      >
                        Editar
                      </Button>
                      {
                        window === "departamentos" && 
                        <Button
                          className="me-4"
                          onClick={(e) => handleClickEditInventoryDepartment(e, item)}
                          variant="primary"
                      >
                        Inventario
                      </Button>
                      }
                      
                      <Button
                        onClick={(e) => handleClickDeleteDepartment(e, item)}
                        variant="primary"
                      >
                        Eliminar
                      </Button>
                    </Fragment>
                  ) : (
                    // {/* <Button
                    //   onClick={(e) => handleClickReservar(e, item)}
                    //   variant="primary"
                    // >
                    //   Reservar
                    // </Button> */}
                    <Link
                          to={`/departamentDetails?departamentID=${item._id}`}
                          className="btn btn-primary"
                          style={{ cursor: "pointer" }}
                    ></Link>
                  )}
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