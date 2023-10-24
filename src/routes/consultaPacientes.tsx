import React, { useState } from "react";
import { Accordion, Button, Form, InputGroup, Stack, Table } from "react-bootstrap";
import { usePacienteData } from "../hooks/usePacienteData";


export default function ConsultaPacientes() {

  const [nome, setNome] = useState();
  const { isInitialLoading, isError, data, error, refetch } = usePacienteData(nome);


  return (
    <Accordion data-bs-theme="dark">
      <Stack gap={1}>
        <div className="p-1"></div>
      </Stack>
      <Button onClick={() => refetch()} as="input" type="button" value="Consultar todos" className="mb-3" />
      <InputGroup className="mb-1">
        <InputGroup.Text>Consultar por nome: </InputGroup.Text>
        <Form.Control type="text" onChange={(e) => setNome(e.target.value)} />
      </InputGroup>
      {data?.data ? (
        <>
          {data?.data.map((dado) => (
            <Accordion.Item eventKey={dado.id} key={dado.id}>
              <Accordion.Header >{dado.nome}</Accordion.Header>
              <Accordion.Body>

                <InputGroup className="mb-1">
                  <InputGroup.Text id="basic-addon3">
                    Endereço:
                  </InputGroup.Text>
                  <InputGroup.Text id="basic-addon3">
                    {dado.endereco}
                  </InputGroup.Text>
                </InputGroup>
                <InputGroup className="mb-1">
                  <InputGroup.Text id="basic-addon3">
                    Data de inicio:
                  </InputGroup.Text>
                  <InputGroup.Text id="basic-addon3">
                    {dado.dataDeInicio}
                  </InputGroup.Text>
                </InputGroup>
                <InputGroup className="mb-1">
                  <InputGroup.Text id="basic-addon3">
                    Tipo de sessão:
                  </InputGroup.Text>
                  <InputGroup.Text id="basic-addon3">
                    {dado.tipo}
                  </InputGroup.Text>
                </InputGroup>

                <InputGroup className="mb-1">
                  <Table striped bordered hover variant="dark" >
                    <thead>
                      <tr>
                        <th>Mês</th>
                        <th>Quantidade de dias no mês</th>
                        <th>Valor por sessão</th>
                        <th>Ano</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dado.valores.map((valor) => (
                        <tr>
                          <td>{valor.mes}</td>
                          <td>{valor.quantidaDeDiasNoMes}</td>
                          <td>{valor.valorPorSessao}</td>

                          <td>{valor.ano}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </InputGroup>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </>
      ) : isError ? (
        <></>
      ) : isInitialLoading ? (
        <></>
      ) : (
        <></>
      )}

    </Accordion>
  )
}
