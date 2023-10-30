import { Form } from "react-bootstrap";
import { useMesData } from "../hooks/useMesData";

export default function SelectDeMeses({ selectedValue, onChange }: {
  selectedValue: string,
  onChange: (value: string) => void;
}) {
  const { data } = useMesData();

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
