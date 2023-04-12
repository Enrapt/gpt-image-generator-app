import { useState } from "react";
interface Variable {
keyword: string;
placeholder: string;
value: string;
}
export default function Home() {
const [keyword, setKeyword] = useState("");
const [variables, setVariables] = useState<Variable[]>([]);
const [generatedImages, setGeneratedImages] = useState([]);
async function fetchVariables() {
  const res = await fetch(`/api/variables?keyword=${keyword}`);
  const data = await res.json();
  const dataVariables = data.variables;
  const outputArray = JSON.parse(dataVariables);
  setVariables(outputArray);
}
async function fetchGeneratedImages(variables: Variable[]) {
  const res = await fetch("/api/images", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ variables, keyword }),
  });
  const data = await res.json();
  setGeneratedImages(data.images);
}
return (
  <div>
    {/* 抽象キーワード入力フォーム */}
    <input
      type="text"
      placeholder="抽象キーワードを入力してください"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
    />
    <button onClick={fetchVariables}>サブミット</button>
    {/* 変数入力フォーム */}
    {variables.map((variable, index) => (
      <div key={index}>
        <label>{variable.keyword}</label>
        <input
          type="text"
          placeholder={variable.placeholder}
          value={variable.value}
          onChange={(e) => {
            const updatedVariables = [...variables];
            updatedVariables[index].value = e.target.value;
            setVariables(updatedVariables);
          }}
        />
      </div>
    ))}
    {variables.length > 0 && (
      <button onClick={() => fetchGeneratedImages(variables)}>
        画像を生成
      </button>
    )}
    {/* 生成画像リスト */}
    {generatedImages.map((image: {url: string}, index) => (
      <div key={index}>
        <img src={image.url} alt={`生成画像${index + 1}`} />
      </div>
    ))}
  </div>
);
}