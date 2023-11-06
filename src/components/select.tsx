import React from "react";
import { Form } from "react-bootstrap";

export default function Select({ data, selectedValue, onChange }) {
  return (
    <>
      {data && (
        <Form.Select onChange={(e) => onChange(e.target.value)} >
          {data?.data.map((dado, index) => (
            <option key={index} value={dado.name} defaultValue={selectedValue}>{dado.descricao}</option>
          ))}
        </Form.Select >
      )}
    </>
  )
}
