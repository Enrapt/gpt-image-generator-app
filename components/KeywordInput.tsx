import { useState } from "react";

interface KeywordInputProps {
  onSubmit: (keyword: string) => void;
}

const KeywordInput: React.FC<KeywordInputProps> = ({ onSubmit }) => {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(keyword);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a keyword (e.g. cute cat)"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default KeywordInput;