import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Spinner, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Mensagem from "./components/mensagem";

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const mutation = useMutation({
        mutationFn: async (dadosParaCriacao) => {
            try {
                return await axios.post("https://18.230.188.37:8443/psicologia-0.3.0/auth/login/", dadosParaCriacao);
            } catch (error) {
                Mensagem.exibirFalha(error.response.data.massage)
            }
        },
        onSuccess: (retorno) => {
            if (retorno?.status === 200) {
                navigate('/home')
                localStorage.setItem("tokenDoUsuario", retorno.data.token);
                localStorage.setItem("usuario", retorno.data.usuarioId);
            }
        }
    })

    const criarLogin = (e) => {
        e.preventDefault();
        const dadosParaCriacao = {
            username,
            password,
        };
        mutation.mutate(dadosParaCriacao);
    };

    return (
        <>
            {
                mutation.isLoading ? (
                    <div className="overlay d-flex justify-content-center" >
                        <Spinner animation="border" role="status" />
                    </div>
                ) : (
                    <div className="overlay d-flex justify-content-center" >
                        <Container>
                            <Row>
                                <Col>
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
                                            <Button variant="dark" as="input" type="submit" value={"Logar"} />
                                        </Stack>
                                    </form>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                )
            }
        </>

    )
}