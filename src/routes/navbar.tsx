import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

export default function BarraDeNavegacao() {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Navbar.Brand href="">Pacientes</Navbar.Brand>
                <Nav className="me-auto justify-content-end" fill variant="underline">
                    <Nav.Item>
                        <Nav.Link as={Link} to="adicionar">Adicionar</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="consultar">Consultar</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="fechamento">Fechamento</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="logout">Logout</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar>
        </>
    )
}