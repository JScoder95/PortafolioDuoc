import React, { Fragment } from "react";
import Tab from "react-bootstrap/Tab";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";

import Table from "react-bootstrap/Table";
import {
  capitalizeFirstLetter,
  MoneyFormatter,
} from "../../common/utils";

export const GananciasAnuales = ({ arrayZona, arrayDepto }) => {

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={2}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="depto">Departamentos</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="zona">Zonas</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={10}>
          <Tab.Content>
            <Tab.Pane eventKey="depto">
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
                        <td> {capitalizeFirstLetter (item.deptoInfo)} </td>
                        <td> {item.TotalReservas} </td>
                        <td> {MoneyFormatter(item.valor)} </td>
                      </tr>
                    </Fragment>
                  ))}
                </tbody>
              </Table>
            </Tab.Pane>
            <Tab.Pane eventKey="zona">
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
                        <td> {capitalizeFirstLetter( item.zona)} </td>
                        <td> {item.TotalReservas} </td>
                        <td> {MoneyFormatter(item.valor)} </td>
                      </tr>
                    </Fragment>
                  ))}
                </tbody>
              </Table>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};
