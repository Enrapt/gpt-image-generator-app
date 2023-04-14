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
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content:`[画像の抽象的な情報]をより具体化するための属性をできるだけ多く洗い出して、
        * コードブロックなし
        * [出力フォーマット]で出力してください。
        * 余計なラベルや補足は出力しないでください。
        * 出力結果は[出力フォーマット]のみ出力してください。

        [出力フォーマット]
        [
          {\"attribute_name\": \"スタイル\", \"description\": \"写真、デジタルアート、油絵など\"},
          { \"attribute_name\": \"構図\", \"description\": \"俯瞰、正面図、斜めから見た図など\" },
          { \"attribute_name\": \"背景\", \"description\": \"森、山、海、湖、街並みなど\"}...
        ]
        `
      },
      { role: "user", content: `[画像の抽象的な情報]=${keyword}` },
    ],
  });

  const variables = await response.data.choices[0].message?.content;

  console.log({variables});

  res.status(200).json({ variables });
}