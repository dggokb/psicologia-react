import React from "react";
import { Form, InputGroup } from "react-bootstrap";

export default function BuscaDePacientePorNome({ setNomeParaBusca }) {
    return (
        <>
            <InputGroup className="mb-1">
                <InputGroup.Text>Nome: </InputGroup.Text>
                <Form.Control type="text" onChange={(e) => setNomeParaBusca(e.target.value)} />
            </InputGroup>
        </>
    )
}