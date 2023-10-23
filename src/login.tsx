import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Login({ queryClient }: {
    queryClient: QueryClient;
}) {

    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const mutation = useMutation((dadosParaCriacao) => {
        return axios.post("http://localhost:8080/auth/login", dadosParaCriacao);
    },
        {
            onSuccess: (retorno) => {
                navigate('/home')
                localStorage.setItem("tokenDoUsuario", retorno.data.token);
            },
        }
    );

    const criarLogin = (e) => {
        e.preventDefault();
        const dadosParaCriacao = {
            username,
            password,
        };
        mutation.mutate(dadosParaCriacao);
    };

    return (
        <Container>
            <Stack gap={1}>
                <div className="p-5"></div>
                <div className="p-5"></div>
            </Stack>
            <Row className="justify-content-center">
                <Col md="auto">
                    <form onSubmit={criarLogin}>
                        <h3>Login</h3>
                        <Stack direction="vertical" gap={1}>
                            <Form.Label>Faça o login com seu usuário e senha:</Form.Label>
                            <Form.Group className="mb-2" controlId="usuarioId">
                                <Form.Control type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Usuário" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="senhaId">
                                <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
                            </Form.Group>
                            <Button as="input" type="submit" value={mutation.isSuccess ? "Logado!" : "Logar"} />
                        </Stack>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}