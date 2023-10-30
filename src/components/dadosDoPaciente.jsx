import React from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import SelectDeMeses from "../components/selectDeMeses";
import SelectDeTipoDePaciente from "../components/selectDeTipoDePaciente";

export default function DadosDoPaciente({ setQuantidaDeDiasNoMes, setValorPorSessao, mes, setMes, setAno, tipo, setTipo, visivel }) {

    return (
        <>
            {visivel &&
                <>
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
                </>
            }
        </>
    )
}