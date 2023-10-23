
export default function Select({ data, selectedValue, onChange }: {
  data: { name: string, descricao: string };
  selectedValue: string;
  onChange: (value: string) => void;
}) {

  return (
    <>
      <select onChange={(e) => onChange(e.target.value)}>
        {data?.map((dado, index) => (
          <option key={index} value={dado.name} defaultValue={selectedValue}>{dado.descricao}</option>
        ))}
      </select>

    </>
  )
}
