import React, { Fragment } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {
  cancelReserve,
  doCheckIn,
  doCheckOut,
} from "../../actions/departamentos";
import useAuth from "../../hooks/useAuth";
import "./TablaReservas.css";

function TablaReservas({ array, setIsLoading }) {
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
  const handleClickCheckIn = (e, id) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(auth?.token);
    doCheckIn(id, auth?.token)
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        console.log("CHECKIN HECHO");
      })
      .catch((err) => {
        console.log(err.response);
        console.log("NOPE");
      });
  };
  const handleClickCheckOut = (e, id) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(auth?.token);
    doCheckOut(id, auth?.token)
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        console.log("CHECKOUT HECHO");
      })
      .catch((err) => {
        console.log(err.response);
        console.log("NOPE");
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
                    !item?.checkIn ? (
                      <Button
                        onClick={(e) => handleClickCheckIn(e, item?._id)}
                        variant="primary"
                      >
                        Check In
                      </Button>
                    ) : (
                      <Button
                        onClick={(e) => handleClickCheckOut(e, item?._id)}
                        variant="primary"
                      >
                        Check Out
                      </Button>
                    )
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
