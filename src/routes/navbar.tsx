import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="p-3 mb-2 bg-dark text-white">
            <Row>
                <Col >
                    <Link to="adicionar">Adicionar</Link>
                </Col>
                <Col>
                    <Link to="buscar">Buscar</Link>
                </Col>
            </Row>
        </div>
    )
}