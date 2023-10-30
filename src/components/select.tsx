import { Form } from "react-bootstrap";
import { useMesData } from "../hooks/useMesData";
import React from "react";

export default function Select({ data, selectedValue, onChange }) {
  return (
    <>
      {data && (
        <Form.Select  onChange={(e) => onChange(e.target.value)} >
          {data?.data.map((dado, index) => (
            <option key={index} value={dado.name} defaultValue={selectedValue}>{dado.descricao}</option>
          ))}
        </Form.Select >
      )}
    </>
  )
}
