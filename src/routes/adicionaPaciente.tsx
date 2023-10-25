import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, InputGroup, Row, Stack } from "react-bootstrap";
import SelectDeMeses from "../components/selectDeMeses";
import SelectDeTipoDePaciente from "../components/selectDeTipoDePaciente";

export default function AdicionaPaciente({ queryClient }: {
  queryClient: QueryClient;
}) {

  const [nome, setNome] = useState();
  const [endereco, setEndereco] = useState();
  const [quantidaDeDiasNoMes, setQuantidaDeDiasNoMes] = useState();
  const [valorPorSessao, setValorPorSessao] = useState();
  const [mes, setMes] = useState();
  const [ano, setAno] = useState();
  const [tipo, setTipo] = useState("VALOR_POR_SESSAO");
  const token = localStorage.getItem("tokenDoUsuario");
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    data: {},
  };

  const mutation = useMutation((dadosParaCriacao) => {
    return axios.post("http://localhost:8080/paciente", dadosParaCriacao, config);
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('paciente-data');
      },
    }
  );

  const criarPaciente = (e) => {
    e.preventDefault();
    const dadosParaCriacao = {
      nome,
      endereco,
      quantidaDeDiasNoMes,
      valorPorSessao,
      mes,
      ano,
      tipo
    };

    mutation.mutate(dadosParaCriacao);
  };

  return (
    <Row data-bs-theme="dark">
      <Col md="auto">
        <form onSubmit={criarPaciente}>
          <Stack gap={1}>
            <div className="p-1"></div>
          </Stack>
          <InputGroup className="mb-1">
            <InputGroup.Text>Nome: </InputGroup.Text>
            <Form.Control type="text" onChange={(e) => setNome(e.target.value)} />
          </InputGroup>
          <InputGroup className="mb-1">
            <InputGroup.Text>Endereço: </InputGroup.Text>
            <Form.Control type="text" onChange={(e) => setEndereco(e.target.value)} />
          </InputGroup>
          <InputGroup className="mb-1">
            <InputGroup.Text>Quantidade de dias no mês: </InputGroup.Text>
            <Form.Control type="number" onChange={(e) => setQuantidaDeDiasNoMes(e.target.value)} />
          </InputGroup>
          <InputGroup className="mb-1">
            <InputGroup.Text>Valor por sessão: </InputGroup.Text>
            <Form.Control type="number" onChange={(e) => setValorPorSessao(e.target.value)} />
          </InputGroup>
          <Row>
            <Col>
              <InputGroup className="mb-1">
                <InputGroup.Text>Mês: </InputGroup.Text>
                <SelectDeMeses selectedValue={mes} onChange={setMes} />
              </InputGroup>
            </Col>
            <Col>
              <InputGroup className="mb-1">
                <InputGroup.Text>Ano: </InputGroup.Text>
                <Form.Control type="number" onChange={(e) => setAno(e.target.value)} />
              </InputGroup>
            </Col>
          </Row>
          <InputGroup className="mb-2">
            <InputGroup.Text>Tipo: </InputGroup.Text>
            <SelectDeTipoDePaciente selectedValue={tipo} onChange={setTipo} />
          </InputGroup>
          <Button variant="dark" as="input" type="submit" value={mutation.isSuccess ? "Salvo!" : "Salvar"} />
        </form>
      </Col>
    </Row>
  )
}