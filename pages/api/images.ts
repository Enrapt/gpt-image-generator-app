import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const abstractInput = req.body.keyword;

  const { variables } = req.body;

  const promptArray = variables.map((variable: { value: string; }) => variable.value);
  const promptText = promptArray.join(",");

  const promptInput = `${abstractInput},${promptText}`;
  console.log(promptInput);

  // 画像生成AIを使って画像を生成する処理を実装します（モックデータを返す）

  const response = await openai.createImage({
    prompt: promptInput,
    n: 4,
    size: "512x512",
    response_format: "url"
  });

  const images = await response.data.data

  res.status(200).json({ images });
}