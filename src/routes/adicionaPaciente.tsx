import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Accordion, Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import DadosDoPaciente from "../components/dadosDoPaciente";
import Mensagem from "../components/mensagem";
import { usePacienteData } from "../hooks/usePacienteData";

export default function AdicionaPaciente() {
  const [nomeParaBusca, setNomeParaBusca] = useState();
  const { data } = usePacienteData(nomeParaBusca);
  const [nome, setNome] = useState();
  const [endereco, setEndereco] = useState();
  const [quantidaDeDiasNoMes, setQuantidaDeDiasNoMes] = useState();
  const [valorPorSessao, setValorPorSessao] = useState();
  const [mes, setMes] = useState("JANEIRO");
  const [ano, setAno] = useState(new Date().getFullYear());
  const [tipo, setTipo] = useState("VALOR_FIXO");
  const [dadosDoPaciente, setDadosDoPaciente] = useState(false);
  const [frequencia, setFrequencia] = useState(false);
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
      usuarioId,
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
    <>
      <Button variant="dark" onClick={() => {
        setDadosDoPaciente(true);
        setFrequencia(false);
      }}>Novo Paciente</Button>
      <Button variant="dark" onClick={() => {
        setDadosDoPaciente(false);
        setFrequencia(true);
      }}>Adicionar mês do paciente</Button>

      <Row data-bs-theme="dark">
        <Col md="auto">
          <form onSubmit={criarPaciente}>
            {dadosDoPaciente &&
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
                  setQuantidaDeDiasNoMes={setQuantidaDeDiasNoMes}
                  setValorPorSessao={setValorPorSessao}
                  mes={mes}
                  setMes={setMes}
                  setAno={setAno}
                  tipo={tipo}
                  setTipo={setTipo}
                  visivel={dadosDoPaciente} />
                <Button variant="dark" as="input" type="submit" value={"Salvar"} />
              </>
            }
            {frequencia &&
              <>
                <Accordion data-bs-theme="dark">
                  {/*TODO: criar componente */}
                  {/* <InputGroup className="mb-1">
                    <InputGroup.Text>Nome: </InputGroup.Text>
                    <Form.Control type="text" onChange={(e) => setNomeParaBusca(e.target.value)} />
                  </InputGroup> */}
                  <BuscaDePacientePorNome setNomeParaBusca={setNomeParaBusca} />

                  {data && (
                    <>
                      {data?.data.map((dado) => {
                        return (
                          <Accordion.Item eventKey={dado.id} key={dado.id}>
                            <Accordion.Header onClick={() => {
                              setNome(dado.nome);
                              setEndereco(dado.endereco);
                            }}> {dado.nome}</Accordion.Header>
                            <Accordion.Body>
                              <DadosDoPaciente
                                setQuantidaDeDiasNoMes={setQuantidaDeDiasNoMes}
                                setValorPorSessao={setValorPorSessao}
                                mes={mes}
                                setMes={setMes}
                                setAno={setAno}
                                tipo={tipo}
                                setTipo={setTipo}
                                visivel={frequencia} />
                              <Button variant="dark" as="input" type="submit" value={"Salvar"} />
                            </Accordion.Body>
                          </Accordion.Item>
                        );
                      })}
                    </>
                  )}
                </Accordion>
              </>
            }
          </form>
        </Col>
      </Row >
    </>
  )
}

function BuscaDePacientePorNome({setNomeParaBusca}) {
  return(
    <>
      <InputGroup className="mb-1">
        <InputGroup.Text>Nome: </InputGroup.Text>
        <Form.Control type="text" onChange={(e) => setNomeParaBusca(e.target.value)} />
      </InputGroup>
    </>
  )
}