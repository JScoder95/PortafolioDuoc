import React, { Fragment, useRef, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import jsPDF from "jspdf";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import {
  capitalizeFirstLetter,
  formatDateInventory,
  MoneyFormatter,
} from "../../common/utils";

export const GananciasDiarias = ({ arrayZona, arrayDepto }) => {
  const pdfRef = useRef(null);
  const [key, setKey] = useState("");
  const date = new Date();
  const generarPDF = () => {
    const pdf = new jsPDF({
      format: "a4",
      unit: "pt",
    });
    // window.html2canvas = html2canvas;
    pdf.html(pdfRef.current, {
      callback: function (pdf) {
        pdf.save(
          `Reporte Ganancias Diarias-${key}-${formatDateInventory(date)}.pdf`
        );
      },
      html2canvas: { scale: 0.42 },
    });
  };

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={2}>
          <Nav
            variant="pills"
            className="flex-column"
            onSelect={(k) => setKey(k)}
          >
            <Nav.Item>
              <Nav.Link eventKey="Departamentos">Departamentos</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="Zonas">Zonas</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={10}>
          <Tab.Content
            ref={pdfRef}
            style={{ marginLeft: "20px", marginRight: "20px" }}
          >
            {key !== "" ? (
              <div>
                <h3>{`Reporte de Ganancias Diarias por ${key} `}</h3>
              </div>
            ) : (
              <div>
                <h4>Para poder vizualizar y generar un informe debe seleccionar una opcion en el menu de la izquierdo</h4>
              </div>
            )}
            
            <Tab.Pane eventKey="Departamentos">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th style={{ width: "100px" }}>Fecha</th>
                    <th>Nombre Departamento </th>
                    <th>Total de Ventas</th>
                    <th>{"Total Vendido"}</th>
                  </tr>
                </thead>
                <tbody>
                  {arrayDepto?.map((item, index) => (
                    <Fragment key={index}>
                      <tr>
                        <td style={{ justifyItems: "center" }}>
                          {item.fecha}{" "}
                        </td>
                        <td> {item.deptoInfo} </td>
                        <td> {item.TotalReservas} </td>
                        <td> {MoneyFormatter(item.valor)} </td>
                      </tr>
                    </Fragment>
                  ))}
                </tbody>
              </Table>
            </Tab.Pane>
            <Tab.Pane eventKey="Zonas">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th style={{ width: "100px" }}>Fecha</th>
                    <th>Zona </th>
                    <th>Total de Ventas</th>
                    <th>{"Total Vendido"}</th>
                  </tr>
                </thead>
                <tbody>
                  {arrayZona?.map((item, index) => (
                    <Fragment key={index}>
                      <tr>
                        <td style={{ justifyItems: "center" }}>
                          {item.fecha}{" "}
                        </td>
                        <td> {item.zona} </td>
                        <td> {item.TotalReservas} </td>
                        <td> {MoneyFormatter(item.valor)} </td>
                      </tr>
                    </Fragment>
                  ))}
                </tbody>
              </Table>
            </Tab.Pane>
          </Tab.Content>
          <div className="text-sm-end m-2">
            {key !== "" ? (
              <Button
                style={{ marginTop: "20px", justifyContent: "end" }}
                onClick={generarPDF}
              >
                Obtener Informe
              </Button>
            ) : null}
          </div>
        </Col>
      </Row>
    </Tab.Container>
  );
};
