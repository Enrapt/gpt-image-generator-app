import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const keyword = req.query.keyword as string;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      // JSON形式に変換するための指示を含むシステムのメッセージと、OCRで取得したテキストを含むユーザーのメッセージを送信する
      {
        role: "system",
        content:"[画像の抽象的な情報]をより具体化するために必要な情報をできるだけ多く洗い出して、\n*コードブロックなし\n*[出力フォーマット]で出力してください。\n* 出力結果は[{}]のデータのみ返し、説明などは出力しないでください。\n\n[出力フォーマット]\n [{\"attribute_name\": \"スタイル\", \"description\": \"写真、デジタルアート、油絵など\"},{ \"attribute_name\": \"構図\", \"description\": \"俯瞰、正面図、斜めから見た図など\" },{ \"attribute_name\": \"背景\", \"description\": \"森、山、海、湖、街並みなど\"}...]"
      },
      { role: "user", content: `[画像の抽象的な情報]=${keyword}` },
    ],
  });

  const variables = await response.data.choices[0].message?.content;

  console.log({variables});

  res.status(200).json({ variables });
}