import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import DadosDoPaciente from "../components/dadosDoPaciente";
import Mensagem from "../components/mensagem";


export default function AdicionaPaciente() {
  const [datasDasSessoes, setDataDaSessao] = useState([]);
  const [nome, setNome] = useState();
  const [endereco, setEndereco] = useState();
  const [valorPorSessao, setValorPorSessao] = useState();
  const [mes, setMes] = useState("JANEIRO");
  const [ano, setAno] = useState(new Date().getFullYear());
  const [tipo, setTipo] = useState("VALOR_FIXO");
  const token = localStorage.getItem("tokenDoUsuario");
  const usuarioId = localStorage.getItem("usuario");
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
        return await axios.post("http://18.230.187.245:8080/psicologia-0.3.0/paciente", dadosParaCriacao, config)
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
      usuarioId,
      nome,
      endereco,
      valorPorSessao,
      mes,
      ano,
      tipo,
      datasDasSessoes
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
          <Row data-bs-theme="dark">
            <Col md="auto">
              <form onSubmit={criarPaciente}>
                <>
                  < InputGroup className="mb-0 p-0">
                    <InputGroup.Text>Nome: </InputGroup.Text>
                    <Form.Control type="text" onChange={(e) => setNome(e.target.value)} />
                  </InputGroup>
                  <InputGroup className="mb-0">
                    <InputGroup.Text>Endereço: </InputGroup.Text>
                    <Form.Control type="text" onChange={(e) => setEndereco(e.target.value)} />
                  </InputGroup>
                  <DadosDoPaciente
                    setValorPorSessao={setValorPorSessao}
                    mes={mes}
                    setMes={setMes}
                    setAno={setAno}
                    tipo={tipo}
                    setTipo={setTipo}
                    dataDaSessao={datasDasSessoes}
                    setDataDaSessao={setDataDaSessao}
                    visivel={true}
                  />
                  <Button variant="dark" as="input" type="submit" value={"Salvar"} />
                </>
              </form>
            </Col>
          </Row >
        )
      }
    </>
  )
}