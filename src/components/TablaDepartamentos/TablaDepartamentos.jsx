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
import { deleteDepartment } from "../../actions/departamentos";
import { message } from "antd";
import "./TablaDepartamentos.css";

function TablaDepartamentos({
  array,
  setSelectedDepto,
  setIsLoading,
  handleOpenEdit,
  handleOpenEditInventory,
  disponible,
  window
}) {
  const { auth } = useAuth();
  const authLocal = ( auth=={} ? auth : JSON.parse(localStorage.getItem("auth"))  ) ;

  const success = () => {
    message.success("Se ha eliminado el departamento correctamente");
  };
  const error = () => {
    message.error("Ha ocurrido un error, intentalo nuevamente");
  };

  const handleClickEditDepartment = (e, id) => {
    e.preventDefault();
    handleOpenEdit();
    setSelectedDepto(id);
  };
  const handleClickEditInventoryDepartment = (e, id) => {
    e.preventDefault();
    handleOpenEditInventory();
    setSelectedDepto(id);
  };

  const handleClickDeleteDepartment = (e, item) => {
    e.preventDefault();
    setIsLoading(true);
    deleteDepartment(item._id, authLocal?.token)
      .then((res) => {
        setIsLoading(false);
        success();
      })
      .catch((err) => {
        console.log(err);
        error();
      });
  };
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Dirección</th>

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
              <td> <i
                  className="bx bx-building-house"
                  style={{ color: "RGB(159 12 192)" }}
                ></i> {capitalizeFirstLetter(item.nombre)}</td>
              <td> <i
                  className="bx bx-map-pin"
                  style={{ color: "RGB(192 23 12)" }}
                ></i> {capitalizeFirstLetter(item.direccion)}{', '}{capitalizeFirstLetter(item.ubicacion)}</td>

              <td> <i
                  className="bx bx-bath"
                  style={{ color: "RGB(96 154 212)" }}
                ></i>{'  '} {item.banos}</td>
              <td><i
                  className="bx bx-hotel"
                  style={{ color: "RGB(12 163 192)" }}
                ></i> {'  '} {item.habitaciones}</td>
              <td> <i
                  className="bx bx-money"
                  style={{ color: "RGB(80 197 45)" }}
                ></i> {MoneyFormatter(item.valorArriendo)}</td>
              <td> <i
                  className="bx bx-calendar-check"
                  style={{ color: "RGB(80 197 45)" }}
                ></i> {formatDate(item.fechaPublicacion)}</td>
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
                        className='action__button'
                        onClick={(e) => handleClickEditDepartment(e, item)}
                        variant="primary"
                      >
                        Editar
                      </Button>
                      {
                        window === "departamentos" && 
                        <Button
                        className='action__button'
                          onClick={(e) => handleClickEditInventoryDepartment(e, item)}
                          variant="primary"
                      >
                        Inventario
                      </Button>
                      }
                      
                      <Button
                        onClick={(e) => handleClickDeleteDepartment(e, item)}
                        variant="primary"
                        className='action__button'
                      >
                        Eliminar
                      </Button>
                    </Fragment>
                  ) : (                   
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