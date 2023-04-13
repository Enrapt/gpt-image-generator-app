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
    let formattedStringAttributes = "";

    for (const attribute of attributeVariables) {
      formattedStringAttributes += `${attribute.attribute_name}:${attribute.value},`
    }

    console.log({formattedStringAttributes});

    const responseGPT = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      // JSON形式に変換するための指示を含むシステムのメッセージと、OCRで取得したテキストを含むユーザーのメッセージを送信する
      {
        role: "system",
        content:"[画像の抽象的な情報]と[属性]を基に画像生成AIで画像を生成したい。\n画像を生成するためのプロンプトを英語で出力してください。\n\n*[出力フォーマット]で出力してください。\n* 出力結果には[出力フォーマット]という文字は含めないでください。\n* 出力結果は[出力フォーマット]の結果のみ返してください。\n\n[出力フォーマット] {Image abstract information},{attribute1},{attribute2},...,{attributeN}"
      },
      { role: "user", content: `[画像の抽象的な情報]=${abstractInputKeyword},\n [属性]=${formattedStringAttributes}` },
    ],
  });

  const imagePrompt = await responseGPT.data.choices[0].message?.content;

  console.log({imagePrompt});

  // 画像生成AIを使って画像を生成する処理を実装します
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