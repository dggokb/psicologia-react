import React, { useCallback, useState } from "react";
import { Accordion, Button, Col, Form, InputGroup, Row, Stack, Table } from "react-bootstrap";
import { usePacienteData } from "../hooks/usePacienteData";
import SelectDeMeses from "../components/selectDeMeses";
import { useFechamentoData } from "../hooks/useFechamentoData";


export default function ConsultaFechamento() {

  const [nome, setNome] = useState();
  const [id, setId] = useState('');
  const [mes, setMes] = useState('JANEIRO');
  const [ano, setAno] = useState(2023);
  const [valorTotal, setValorTotal] = useState();
  const { data, refetch } = usePacienteData(nome);
  const retorno = useFechamentoData(id, mes, ano);

  return (

    <Accordion data-bs-theme="dark">
      {/*TODO: criar componente */}
      <InputGroup className="mb-1">
        <InputGroup.Text>Nome: </InputGroup.Text>
        <Form.Control type="text" onChange={(e) => setNome(e.target.value)} onKeyUp={() => refetch()} />
      </InputGroup>
      
      {data && (
        <>
          {data?.data.map((dado) => {
            return (
              <Accordion.Item eventKey={dado.id} key={dado.id}>
                <Accordion.Header onClick={() => setId(dado.id)}> {dado.nome}</Accordion.Header>
                <Accordion.Body>
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
                        <Form.Control type="number" defaultValue={2023} onChange={(e) => setAno(e.target.value)} />
                      </InputGroup>
                    </Col>
                  </Row>
                  <InputGroup className="mb-1">
                    <InputGroup.Text id="basic-addon3">
                      Valor:
                    </InputGroup.Text>
                    <InputGroup.Text id="basic-addon3">
                      {retorno.data?.data.valorTotal}
                    </InputGroup.Text>
                  </InputGroup>
                </Accordion.Body>
              </Accordion.Item>


            );
          })}
        </>
      )}

    </Accordion>
  )
}
function updateState(arg0: {}): any {
  throw new Error("Function not implemented.");
}

