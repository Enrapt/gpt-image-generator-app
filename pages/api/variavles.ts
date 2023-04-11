import type { NextApiRequest, NextApiResponse } from 'next';

type Variable = {
  name: string;
  example: string;
};

type VariablesApiResponse = {
  variables: Variable[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<VariablesApiResponse>
) {
  const { keyword } = req.query;

  // 変数生成処理を実行し、生成された変数を取得する
  const variables = generateVariables(keyword as string);

  res.status(200).json({ variables });
}

function generateVariables(keyword: string): Variable[] {
  // TODO: 変数生成処理を実装する
  // ここではダミーデータを返す
  return [
    { name: 'breed', example: 'Scottish Fold' },
    { name: 'color', example: 'brown' },
    { name: 'pose', example: 'sitting' },
  ];
}