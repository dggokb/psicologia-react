import React from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import { useMesData } from "../hooks/useMesData";
import { useTiposDePacienteData } from "../hooks/useTiposDePacienteData";
import Select from "./select";
import DatePicker from "react-multi-date-picker";

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
                        <InputGroup.Text>Valor por sessão: </InputGroup.Text>
                        <Form.Control type="number" onChange={(e) => setValorPorSessao(e.target.value)} />
                    </InputGroup>
                    <Row>
                        <Col>
                            <InputGroup className="mb-0">
                                <InputGroup.Text>Mês: </InputGroup.Text>
                                <Select data={mesData.data} selectedValue={mes} onChange={setMes} />
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
                        <Select data={tipoData.data} selectedValue={tipo} onChange={setTipo} />
                    </InputGroup>
                    {tipo === 'VALOR_POR_SESSAO' && <InputGroup className="mb-0">
                        <InputGroup.Text>Datas das sessões: </InputGroup.Text>
                        <DatePicker value={dataDaSessao} onChange={setDataDaSessao} multiple={true} format={"DD/MM/YYYY"} />
                    </InputGroup>
                    }
                </>
            }
        </>
    )
}