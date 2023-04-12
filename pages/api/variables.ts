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
  // 大規模言語モデルを使って変数を抽出する処理を実装します（モックデータを返す）

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0301",
    messages: [
      // JSON形式に変換するための指示を含むシステムのメッセージと、OCRで取得したテキストを含むユーザーのメッセージを送信する
      {
        role: "system",
        content:"あなたはプロンプトエンジニアです。以下の[目的]と[制約]に従って、最高の答えを出力してください。[目的]* DALL-E2を使用して最も具体的な画像を生成するための変数を出力したい* ユーザーからは抽象的な[テキスト]がinputされる* 抽象的な[テキスト]を基に画像を最も具体的に出力するための変数を日本語で最低３つ作成し、[出力フォーマット]に従って出力してください[制約]* 出力結果は[出力フォーマット]のみ出力してください。* [出力フォーマット]以外の文章は出力しないでください。* 出力結果に対する説明、注釈などは出力しないでください。* keyword,placeholderは日本語で出力してください* keywordには画像の属性、placeholderには属性の例を出力してください* valueは\"\"のまま出力してください* 出力結果には\nなど余計なテキストは出力しないでください[出力フォーマット][{ \"keyword\": \"\", \"placeholder\": \"\", \"value\": \"\" },{ \"keyword\": \"\", \"placeholder\": \"\", \"value\": \"\" },{ \"keyword\": \"\", \"placeholder\": \"\", \"value\": \"\" }]"
      },
      { role: "user", content: `[テキスト] ${keyword}` },
    ],
  });

  const variables = await response.data.choices[0].message?.content;

  res.status(200).json({ variables });
}