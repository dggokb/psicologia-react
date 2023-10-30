import React, { useCallback, useState } from "react";
import { Accordion, Button, Col, Form, InputGroup, Row, Stack, Table, ToastContainer } from "react-bootstrap";
import { usePacienteData } from "../hooks/usePacienteData";
import SelectDeMeses from "../components/selectDeMeses";
import { useFechamentoData } from "../hooks/useFechamentoData";
import BuscaDePacientePorNome from "../components/buscaDePacientePorNome";


export default function ConsultaFechamento() {

  const [nome, setNome] = useState();
  const [id, setId] = useState('');
  const [mes, setMes] = useState('JANEIRO');
  const [ano, setAno] = useState(new Date().getFullYear());
  const { data } = usePacienteData(nome);
  const retorno = useFechamentoData(id, mes, ano);

  return (

    <Accordion data-bs-theme="dark">
      <BuscaDePacientePorNome setNomeParaBusca={setNome} />
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
                      {retorno.data?.data.valorTotal ? retorno.data?.data.valorTotal : 0}
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

