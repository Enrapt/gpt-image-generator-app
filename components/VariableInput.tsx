import { useState } from "react";

type Props = {
  variables: Variable[];
  onSubmit: (values: VariableValue[]) => void;
};

type Variable = {
  name: string;
  example: string;
};

type VariableValue = {
  name: string;
  value: string;
};

const VariableInput = ({ variables, onSubmit }: Props) => {
  const [variableValues, setVariableValues] = useState<VariableValue[]>(() =>
    variables.map(({ name }) => ({ name, value: "" }))
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(variableValues);
  };

  const handleChange = (name: string, value: string) => {
    setVariableValues((prev) =>
      prev.map((variableValue) =>
        variableValue.name === name ? { ...variableValue, value } : variableValue
      )
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      {variables.map(({ name, example }) => (
        <div key={name}>
          <label>
            {name} ({example}):
            <input
              type="text"
              value={variableValues.find((v) => v.name === name)?.value ?? ""}
              onChange={(event) => handleChange(name, event.target.value)}
            />
          </label>
        </div>
      ))}
      <button type="submit">Generate Images</button>
    </form>
  );
};

export default VariableInput;