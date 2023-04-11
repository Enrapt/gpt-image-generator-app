import { useState } from 'react';
import axios from 'axios';

type Variable = {
  name: string;
  example: string;
};

type Image = {
  url: string;
};

export default function Home() {
  const [abstractKeyword, setAbstractKeyword] = useState('');
  const [variables, setVariables] = useState<Variable[]>([]);
  const [imageList, setImageList] = useState<Image[]>([]);

  const handleSubmitAbstractKeyword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.get('/api/variables', {
        params: {
          abstractKeyword,
        },
      });
      setVariables(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitVariables = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const variableValues = Array.from(e.currentTarget.elements)
      .filter((elem) => elem.tagName === 'INPUT')
      .map((elem) => (elem as HTMLInputElement).value);
    try {
      const res = await axios.get('/api/images', {
        params: {
          variables: JSON.stringify(variableValues),
        },
      });
      setImageList(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitAbstractKeyword}>
        <div>
          <label htmlFor="abstractKeyword">Abstract Keyword</label>
          <input
            type="text"
            name="abstractKeyword"
            id="abstractKeyword"
            value={abstractKeyword}
            onChange={(e) => setAbstractKeyword(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {variables.length > 0 && (
        <form onSubmit={handleSubmitVariables}>
          {variables.map((variable) => (
            <div key={variable.name}>
              <label htmlFor={variable.name}>{variable.name}</label>
              <p>{variable.example}</p>
              <input type="text" name={variable.name} id={variable.name} />
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      )}

      {imageList.length > 0 && (
        <div>
          {imageList.map((image) => (
            <img key={image.url} src={image.url} alt="generated image" />
          ))}
        </div>
      )}
    </div>
  );
}