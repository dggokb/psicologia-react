import React from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import { useMesData } from "../hooks/useMesData";
import { useTiposDePacienteData } from "../hooks/useTiposDePacienteData";
import Select from "./select";

export default function DadosDoPaciente({ setValorPorSessao,
    mes,
    setMes,
    setAno,
    tipo,
    setTipo,
    dataDaSessao,
    setDataDaSessao,
    visivel }) {

    const tipoData = useTiposDePacienteData();
    const mesData = useMesData();

    return (
        <>
            {visivel &&
                <>
                     <InputGroup className="mb-0">
                        <InputGroup.Text>Tipo: </InputGroup.Text>
                        <Select data={tipoData.data} selectedValue={tipo} onChange={setTipo} />
                    </InputGroup>
                    <InputGroup className="mb-0">
                        <InputGroup.Text>Valor por sessão: </InputGroup.Text>
                        <Form.Control type="number" onChange={(e) => setValorPorSessao(e.target.value)} />
                    </InputGroup>
                    {tipo === 'VALOR_POR_SESSAO' &&
                        <InputGroup className="mb-0">
                            <InputGroup.Text>Datas das sessões: </InputGroup.Text>
                            <DatePicker multiple value={dataDaSessao}
                                onChange={setDataDaSessao}
                                format={"DD/MM/YYYY"}
                                plugins={[<DatePanel />]}
                                render={<Button variant="dark" as="input" value={"Salvar"} placeholder="click para abrir o calendário" />}
                                className="bg-dark"
                                locales={"br"}
                                dateSeparator=" - "
                            />
                        </InputGroup>
                    }
                    {tipo === 'VALOR_FIXO' &&
                        <Row>
                            <Col>
                                <InputGroup >
                                    <InputGroup.Text>Mês: </InputGroup.Text>
                                    <Select data={mesData.data} selectedValue={mes} onChange={setMes} />
                                </InputGroup>
                            </Col>
                            <Col>
                                <InputGroup >
                                    <InputGroup.Text>Ano: </InputGroup.Text>
                                    <Form.Control type="number" defaultValue={new Date().getFullYear()} onChange={(e) => setAno(e.target.value)} />
                                </InputGroup>
                            </Col>
                        </Row>
                    }
                </>
            }
        </>
    )
}