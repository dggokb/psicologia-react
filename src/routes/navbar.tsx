import React from "react";
import { NavDropdown, Stack } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

export default function BarraDeNavegacao() {
    return (
        <>
            <Stack gap={5}>
                <Navbar bg="dark" data-bs-theme="dark">
                    <div className="p-2">
                        <Navbar.Brand as={Link} to="/home">Home</Navbar.Brand>
                    </div>
                    <Nav >
                        <div className="p-2">
                            <NavDropdown title="Adicionar" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="adicionar">Novo Paciente</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="sessoes">Novas datas das sessões do paciente</NavDropdown.Item>
                            </NavDropdown>
                        </div>
                        <div className="p-2">
                            <Nav.Item>
                                <Nav.Link as={Link} to="consultar">Consultar</Nav.Link>
                            </Nav.Item>
                        </div>
                        <div className="p-2">
                            <Nav.Item>
                                <Nav.Link as={Link} to="fechamento">Fechamento</Nav.Link>
                            </Nav.Item>
                        </div>
                        <div className="p-2 ms-auto">
                            <Nav.Item>
                                <Nav.Link as={Link} to="logout">Logout</Nav.Link>
                            </Nav.Item>
                        </div>
                    </Nav>
                </Navbar>
            </Stack>
        </>
    )
}