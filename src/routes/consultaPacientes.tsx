import React from "react";
import { Accordion, Button, Col, InputGroup, Row, Stack, Table } from "react-bootstrap";
import { usePacienteData } from "../hooks/usePacienteData";


export default function ConsultaPacientes() {

  const { isInitialLoading, isError, data, error, refetch } = usePacienteData();

  return (
    <Accordion data-bs-theme="dark">
      <Stack gap={1}>
        <div className="p-1"></div>
      </Stack>
      <Button onClick={() => refetch()} as="input" type="button" value="obter todos" className="mb-3" />

      {data?.data ? (
        <>
          {data?.data.map((dado) => (
            <Accordion.Item eventKey={dado.id}>
              <Accordion.Header>{dado.nome}</Accordion.Header>
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
                  <Table striped bordered hover variant="dark">
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
