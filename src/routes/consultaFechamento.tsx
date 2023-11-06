import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import React, { useState } from "react";
import { Accordion, Button, Col, Form, InputGroup, Row, Spinner, Table } from "react-bootstrap";
import BuscaDePacientePorNome from "../components/buscaDePacientePorNome";
import Select from "../components/select";
import { useFechamentoData } from "../hooks/useFechamentoData";
import { useMesData } from "../hooks/useMesData";
import { usePacienteData } from "../hooks/usePacienteData";

export default function ConsultaFechamento() {

  const [nome, setNome] = useState();
  const [nomeDoPaciente, setNomeDoPaciente] = useState();
  const [id, setId] = useState('');
  const [mes, setMes] = useState('JANEIRO');
  const [ano, setAno] = useState(new Date().getFullYear());
  const { data, isLoading } = usePacienteData(nome);
  const retorno = useFechamentoData(id, mes, ano);
  const dataMes = useMesData();

  function imprimir() {
    var doc = new jsPDF('p', 'pt')
    doc.setFontSize(12);
    doc.text(`Relatório de sessões - ${nomeDoPaciente} - ${mes}/${ano}`, 40, 30)
    doc.text(`Valor total - ${retorno.data?.data.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`, 40, 46)
    autoTable(doc,
      {
        html: '#basic-table',
        styles: {
          fontSize: 12
        },
        startY: 56,
      });
    doc.save(`rel-${nomeDoPaciente}-${mes}/${ano}.pdf`)
  }
  
  return (
    <>
      {
        isLoading ? (
          <div className="overlay d-flex justify-content-center" >
            <Spinner animation="border" role="status" />
          </div>
        ) : (
          <form onSubmit={imprimir}>
            <Accordion data-bs-theme="dark">
              <BuscaDePacientePorNome setNomeParaBusca={setNome} />
              {data && (
                <>
                  {data?.data.map((dado) => {
                    return (
                      <Accordion.Item eventKey={dado.id} key={dado.id}>
                        <Accordion.Header onClick={() => {
                          setId(dado.id)
                          setNomeDoPaciente(dado.nome)
                        }}> {dado.nome}</Accordion.Header>
                        <Accordion.Body>
                          <Row>
                            <Col>
                              <InputGroup className="mb-1">
                                <InputGroup.Text>Mês: </InputGroup.Text>
                                <Select data={dataMes.data} selectedValue={mes} onChange={setMes} />
                              </InputGroup>
                            </Col>
                            <Col>
                              <InputGroup className="mb-1">
                                <InputGroup.Text>Ano: </InputGroup.Text>
                                <Form.Control type="number" defaultValue={2023} onChange={(e) => setAno(e.target.value)} />
                              </InputGroup>
                            </Col>
                            <InputGroup className="mb-1">
                              {dado.valores.map((valor) => (
                                (mes.toLocaleLowerCase() === valor.mes.toLocaleLowerCase()) && (
                                  <InputGroup className="mb-1">
                                    <Table id="basic-table" striped bordered hover variant="dark" >
                                      <thead>
                                        <tr>
                                          <th>Dias de atendimento no mês</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {valor.datasDasSessoes.map((dataDaSessao) => (
                                          <tr>
                                            <td>{dataDaSessao}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </Table>
                                  </InputGroup>
                                )
                              ))}
                            </InputGroup>
                          </Row>
                          <InputGroup className="mb-1">
                            <InputGroup.Text id="basic-addon3">
                              Valor:
                            </InputGroup.Text>
                            <InputGroup.Text id="basic-addon3">
                              {retorno.data?.data.valorTotal ? retorno.data?.data.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 0}
                            </InputGroup.Text>
                          </InputGroup>
                          <Button variant="dark" as="input" type="submit" value={"Imprimir"} />
                        </Accordion.Body>
                      </Accordion.Item>
                    );
                  })}
                </>
              )}
            </Accordion>
          </form>
        )
      }
    </>
  )
}

