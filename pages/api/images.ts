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
    // openAIでDALL-E2に渡すプロンプト生成
    const abstractInputKeyword = req.body.keyword;
    const attributeVariables = req.body.variables;
    const formattedStringAttributes = attributeVariables.map((attribute: { attribute_name: string; value: string; }) => `${attribute.attribute_name}:${attribute.value}`).join("\n");

    console.log({abstractInputKeyword});
    console.log({formattedStringAttributes});

    const responseGPT = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content:`[画像の抽象的な情報]と[属性]を基に画像生成AIで画像を生成したいです。
        画像を生成するためのプロンプト[出力フォーマット]のみを英語で出力してください。
        余計なラベルや補足は出力しないでください。

        [出力フォーマット]
        {Description of the image},{keyword1}, {keyword2},..., {keywordN}
        `
      },
      { role: "user", content: `[画像の抽象的な情報]=${abstractInputKeyword},\n [属性]=${formattedStringAttributes}` },
    ],
  });

  const imagePrompt = await responseGPT.data.choices[0].message?.content;

  console.log({imagePrompt});

  // 画像生成AIを使って画像を生成する処理
  if (imagePrompt) {
    const response = await openai.createImage({
      prompt: imagePrompt,
      n: 4,
      size: "512x512",
      response_format: "url"
    });

    const images = await response.data.data

    res.status(200).json({ images });
  }
}