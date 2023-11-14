import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Accordion, Button, Col, Row, Spinner } from "react-bootstrap";
import BuscaDePacientePorNome from "../components/buscaDePacientePorNome";
import DadosDoPaciente from "../components/dadosDoPaciente";
import Mensagem from "../components/mensagem";
import { usePacienteData } from "../hooks/usePacienteData";


export default function AdicionaSessoes() {
  const [datasDasSessoes, setDataDaSessao] = useState([]);
  const [nomeParaBusca, setNomeParaBusca] = useState();
  const { data } = usePacienteData(nomeParaBusca);
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
        return await axios.post("https://18.230.188.37:8443/psicologia-0.3.0/paciente", dadosParaCriacao, config)
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
                  <Accordion data-bs-theme="dark">
                    <BuscaDePacientePorNome setNomeParaBusca={setNomeParaBusca} />
                    {data && (
                      <>
                        {data.data.map((dado) => {
                          return (
                            <Accordion.Item eventKey={dado.id} key={dado.id}>
                              <Accordion.Header onClick={() => {
                                setNome(dado.nome);
                                setEndereco(dado.endereco);
                              }}> {dado.nome}</Accordion.Header>
                              <Accordion.Body>
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
                              </Accordion.Body>
                            </Accordion.Item>
                          );
                        })}
                      </>
                    )}
                  </Accordion>
                </>
              </form>
            </Col>
          </Row >
        )
      }
    </>
  )
}