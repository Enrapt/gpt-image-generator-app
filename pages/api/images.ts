import type { NextApiRequest, NextApiResponse } from 'next';

type Image = {
  url: string;
};

type ImagesApiResponse = {
  images: Image[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ImagesApiResponse>
) {
  const { variables } = req.body;

  // 画像生成処理を実行し、生成された画像のURLを取得する
  const imageUrls = generateImages(variables);

  res.status(200).json({ images: imageUrls.map((url) => ({ url })) });
}

function generateImages(variables: Record<string, string>): string[] {
  // TODO: 画像生成処理を実装する
  // ここではダミーデータを返す
  return [
    'https://dummyimage.com/400x400/000/fff&text=Cute+cat',
    'https://dummyimage.com/400x400/000/fff&text=Adorable+kitten',
    'https://dummyimage.com/400x400/000/fff&text=Fluffy+feline',
  ];
}
