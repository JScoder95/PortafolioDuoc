import React, { Fragment } from "react";
import Table from "react-bootstrap/Table";
import {
  capitalizeFirstLetter,
  MoneyFormatter,
} from "../../common/utils";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { EmblaCarousel } from "../EmblaCarousel/EmblaCarousel";
import "./TablaDepartamentosCliente.css";

function TablaDepartamentosCliente({
  array,
  disponible
}) {
  const { auth } = useAuth();

  return (
    <Table striped hover className="table-department">
      <div className="department__container">
        {array?.filter(item =>  item.disponible === disponible).map((item, index) => (
          <Fragment key={`item-${index}`}>
            <div className="department__card">
              <EmblaCarousel imgs={item.imgs} />
              <div> <i className="bx bx-map-pin" style={{color:'#D92132'}} ></i> {capitalizeFirstLetter(item.ubicacion)}</div>
              <div> <i className="bx bx-bath" style={{color:'#4298EE'}} ></i> Baños: {item.banos} <i className="bx bx-bed" style={{color:'#4298EE'}} ></i> Habitaciones: {item.habitaciones}</div>
              <div> <i className="bx bx-money" style={{color:'#11D12A'}} ></i> {MoneyFormatter(item.valorArriendo)}</div>
              <div>
                <Link 
                  to={`/departamentDetails?departamentID=${item._id}`} 
                  className="btn btn-primary"
                  style={{ cursor: "pointer", width: "100%" }}
                >Ver más</Link>
              </div>  
            </div>
          </Fragment>
        ))}
      </div>
    </Table>
  );
}

export default TablaDepartamentosCliente;
