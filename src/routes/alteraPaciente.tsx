import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Accordion, Form, InputGroup, Spinner } from "react-bootstrap";
import BuscaDePacientePorNome from "../components/buscaDePacientePorNome";
import DadosDoPaciente from "../components/dadosDoPaciente";
import Mensagem from "../components/mensagem";
import ModalDeConfirmacao from "../components/modalDeConfirmacao";
import { usePacienteData } from "../hooks/usePacienteData";

export default function AlteraPaciente() {

  const [nome, setNome] = useState();
  const { data, refetch } = usePacienteData(nome);
  const [id, setId] = useState('');
  const [datasDasSessoes, setDataDaSessao] = useState([]);
  const [endereco, setEndereco] = useState('');
  const [valorPorSessao, setValorPorSessao] = useState();
  const [mes, setMes] = useState("JANEIRO");
  const [ano, setAno] = useState(new Date().getFullYear());
  const [tipo, setTipo] = useState("VALOR_FIXO");
  const [show, setShow] = useState(false);
  const esconderModal = () => setShow(false);
  const exibirModal = () => setShow(true);
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
        return await axios.put("http://localhost:8080/paciente", dadosParaCriacao, config)
      } catch (error) {
        Mensagem.exibirFalha(error.response.data.massage)
      }
    },
    onSuccess: (data) => {
      if (data?.status === 200) {
        Mensagem.exibirSucesso("Paciente alterado com sucesso.")
      }
    }
  })

  function criarPaciente() {
    esconderModal();
    const dadosParaAlteracao = {
      id,
      nome,
      endereco,
      valorPorSessao,
      mes,
      ano,
      tipo,
      datasDasSessoes
    };
    mutation.mutate(dadosParaAlteracao);
  };

  return (
    <>
      {
        mutation.isLoading ? (
          <div className="overlay d-flex justify-content-center" >
            <Spinner animation="border" role="status" />
          </div>
        ) : (
          <Accordion data-bs-theme="dark">
            <BuscaDePacientePorNome setNomeParaBusca={setNome} />
            {data && (
              <>
                {data?.data.map((dado) => (
                  <Accordion.Item eventKey={dado.id} key={dado.id}>
                    <Accordion.Header onClick={() => {
                      setId(dado.id)
                      setNome(dado.nome)
                      setEndereco(dado.endereco)
                    }}> {dado.nome}</Accordion.Header>
                    <Accordion.Body>
                      <form onSubmit={criarPaciente}>
                        <>
                          < InputGroup className="mb-0 p-0">
                            <InputGroup.Text>Nome: </InputGroup.Text>
                            <Form.Control type="text" defaultValue={dado.nome} onChange={(e) => setNome(e.target.value)} />
                          </InputGroup>
                          <InputGroup className="mb-0">
                            <InputGroup.Text>Endereço: </InputGroup.Text>
                            <Form.Control type="text" defaultValue={dado.endereco} onChange={(e) => setEndereco(e.target.value)} />
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
                            visivel={true} />
                          <ModalDeConfirmacao show={show}
                            setShow={setShow}
                            onClick={criarPaciente} />
                        </>
                      </form>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </>
            )}
          </Accordion>
        )
      }
    </>
  )
}
