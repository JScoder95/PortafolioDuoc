import React, { Fragment } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { cancelReserve } from "../../actions/departamentos";
import useAuth from "../../hooks/useAuth";
import "./TablaReservas.css";

function TablaReservas({ array, setIsLoading, handleOpenCheckIn, handleOpenCheckOut }) {
  const { auth } = useAuth();

  const handleClickCancelarReserva = (e, id) => {
    e.preventDefault();
    setIsLoading(true);
    cancelReserve(id, auth?.token)
      .then((res) => {
        setIsLoading(false);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        {array?.map((item, index) => (
          <Fragment key={`item-${index}`}>
            <tr>
              <td>{item?.departamento?.nombre}</td>
              <td>{item?.usuario?.nombre}</td>
              <td className="action__section">
                <div className="action__container">
                  {auth?.usuario?.rol === "Funcionario" ? (
                    <Fragment>
                      <Button
                        onClick={(e) => handleOpenCheckIn(e, item)}
                        variant="primary"
                        disabled={(item.checkIn === true && item.checkOut === true) || (item.checkIn === true && item.checkOut === false) ? true : false}
                      >
                        Check In
                      </Button>
                      <Button
                        onClick={(e) => handleOpenCheckOut(e, item)}
                        variant="primary"
                        style={{ marginLeft: "10px" }}
                        disabled={((item.checkOut === true && item.checkIn === true) || (item.checkOut === true && item.checkIn === false)) || (!item.checkIn && !item.checkOut) ? true : false}
                      >
                        Check Out
                      </Button>
                    </Fragment>
                  ) : (
                    <Button
                      onClick={(e) => handleClickCancelarReserva(e, item?._id)}
                      variant="primary"
                    >
                      Cancelar
                    </Button>
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

export default TablaReservas;
