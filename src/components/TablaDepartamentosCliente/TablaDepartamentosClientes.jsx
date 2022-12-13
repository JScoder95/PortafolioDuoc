import React, { Fragment, useEffect } from "react";
import Table from "react-bootstrap/Table";
import {
  capitalizeFirstLetter,
  formatDate,
  MoneyFormatter,
} from "../../common/utils";
import useAuth from "../../hooks/useAuth";
import { deleteDepartment } from "../../actions/departamentos";
import { Link } from "react-router-dom";
import "./TablaDepartamentosCliente.css";
import { EmblaCarousel } from "../EmblaCarousel/EmblaCarousel";

function TablaDepartamentosCliente({
  array,
  disponible
}) {
  const { auth } = useAuth();

  return (
    <Table striped hover>
      <div className="department__container">
        {array?.filter(item =>  item.disponible === disponible).map((item, index) => (
          <Fragment key={`item-${index}`}>
            <div className="department__card">
              <EmblaCarousel imgs={item.imgs} />
              <div>{capitalizeFirstLetter(item.ubicacion)}</div>
              <div>Baños: {item.banos} Habitaciones: {item.habitaciones}</div>
              <div>{MoneyFormatter(item.valorArriendo)}</div>
              <div>{formatDate(item.fechaPublicacion)}</div>
              <div>
                <Link 
                  to={`/departamentDetails?departamentID=${item._id}`} 
                  className="btn btn-primary"
                  style={{ cursor: "pointer" }}
                >Ver</Link>
              </div>  
            </div>
          </Fragment>
        ))}
      </div>
    </Table>
  );
}

export default TablaDepartamentosCliente;
