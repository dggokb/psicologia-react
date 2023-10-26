import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import Mensagem from "../components/mensagem";
import SelectDeMeses from "../components/selectDeMeses";
import SelectDeTipoDePaciente from "../components/selectDeTipoDePaciente";

export default function AdicionaPaciente() {

  const [nome, setNome] = useState();
  const [endereco, setEndereco] = useState();
  const [quantidaDeDiasNoMes, setQuantidaDeDiasNoMes] = useState();
  const [valorPorSessao, setValorPorSessao] = useState();
  const [mes, setMes] = useState("JANEIRO");
  const [ano, setAno] = useState(new Date().getFullYear());
  const [tipo, setTipo] = useState("VALOR_FIXO");
  const token = localStorage.getItem("tokenDoUsuario");
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    data: {},
  };

  const mutation = useMutation({
    mutationFn: async (dadosParaCriacao) => {
      try {
        return await axios.post("http://localhost:8080/paciente", dadosParaCriacao, config)
      } catch (error) {
        Mensagem.exibirFalha(error.response.data.massage)
      }
    },
    onSuccess: (data) => {
      if (data?.status === 200) {
        Mensagem.exibirSucesso("Paciente adicionado com sucesso.")
      }
    }
  })

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
          <InputGroup className="mb-0 p-0">
            <InputGroup.Text>Nome: </InputGroup.Text>
            <Form.Control type="text" onChange={(e) => setNome(e.target.value)} />
          </InputGroup>
          <InputGroup className="mb-0">
            <InputGroup.Text>Endereço: </InputGroup.Text>
            <Form.Control type="text" onChange={(e) => setEndereco(e.target.value)} />
          </InputGroup>
          <InputGroup className="mb-0">
            <InputGroup.Text>Quantidade de dias no mês: </InputGroup.Text>
            <Form.Control type="number" onChange={(e) => setQuantidaDeDiasNoMes(e.target.value)} />
          </InputGroup>
          <InputGroup className="mb-0">
            <InputGroup.Text>Valor por sessão: </InputGroup.Text>
            <Form.Control type="number" onChange={(e) => setValorPorSessao(e.target.value)} />
          </InputGroup>
          <Row>
            <Col>
              <InputGroup className="mb-0">
                <InputGroup.Text>Mês: </InputGroup.Text>
                <SelectDeMeses selectedValue={mes} onChange={setMes} />
              </InputGroup>
            </Col>
            <Col>
              <InputGroup className="mb-0">
                <InputGroup.Text>Ano: </InputGroup.Text>
                <Form.Control type="number" defaultValue={new Date().getFullYear()} onChange={(e) => setAno(e.target.value)} />
              </InputGroup>
            </Col>
          </Row>
          <InputGroup className="mb-0">
            <InputGroup.Text>Tipo: </InputGroup.Text>
            <SelectDeTipoDePaciente selectedValue={tipo} onChange={setTipo} />
          </InputGroup>
          <Button variant="dark" as="input" type="submit" value={"Salvar"} />
        </form>
      </Col>
    </Row>
  )
}