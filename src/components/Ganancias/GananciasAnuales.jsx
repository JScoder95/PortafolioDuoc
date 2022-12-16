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
  formatDate,
  formatDateInventory,
  MoneyFormatter,
} from "../../common/utils";
import './Ganancias.css';

export const GananciasAnuales = ({ arrayZona, arrayDepto }) => {
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
          `Reporte Ganancias Anuales-${key}-${formatDateInventory(date)}.pdf`
        );
      },
      html2canvas: { scale: 0.38 },
    });
  };
  console.log(key);
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <div className="rows">
          <div>
            <Col sm={2} className="left-col">
              <Nav
                variant="pills"
                className="flex-column"
                onSelect={(k) => setKey(k)}
                style={{ margin: "5px" }}
              >
                <Nav.Item className="button">
                  <Nav.Link eventKey="Departamentos" style={{display: "block"}}>Departamentos</Nav.Link>
                </Nav.Item>
                <Nav.Item className="button">
                  <Nav.Link eventKey="Zonas" style={{display: "block"}}>Zonas</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </div>
          <div className="cols">
            <Col sm={10} style={{marginBottom: "60px"}}>
              <Tab.Content
                ref={pdfRef}
                style={{ marginLeft: "20px", marginRight: "20px" }}
              >
                {key !== "" ? (
                  <div>
                    <h3>{`Reporte de Ganancias Anuales por ${key} `}</h3>
                  </div>
                ) : (
                  <div>
                    <h4>Para poder vizualizar y generar un informe debe seleccionar una opción en el menu de la izquierda</h4>
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
                    style={{ marginTop: "20px", justifyContent: "end"}}
                    onClick={generarPDF}
                  >
                    Obtener Informe
                  </Button>
                  ) : null}
                  </div>
              </Col>
            </div>
          </div>
        </Row>
      </Tab.Container>
  );
};
