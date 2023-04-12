import type { NextApiRequest, NextApiResponse } from 'next';

type Variable = {
  name: string;
  example: string;
};

type VariablesApiResponse = {
  variables: Variable[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VariablesApiResponse>
) {
  const { keyword } = req.query;
  // 大規模言語モデルを使って変数を抽出する処理を実装します（モックデータを返す）
  const variables = [
    { name: "品種", example: "シャム", value: "" },
    { name: "毛色", example: "グレー", value: "" },
    { name: "ポーズ", example: "座っている", value: "" },
  ];

  res.status(200).json({ variables });
}