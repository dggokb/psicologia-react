import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function BarraDeNavegacao() {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Navbar.Brand href="#home">Pacientes</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="adicionar">Adicionar</Nav.Link>
                    <Nav.Link href="consultar">Consultar</Nav.Link>
                </Nav>
            </Navbar>
        </>
    )
}