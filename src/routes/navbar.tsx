import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function BarraDeNavegacao() {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Navbar.Brand href="">Pacientes</Navbar.Brand>
                <Nav className="me-auto" fill variant="underline">
                    <Nav.Item>
                        <Nav.Link href="adicionar">Adicionar</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="consultar">Consultar</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar>
        </>
    )
}