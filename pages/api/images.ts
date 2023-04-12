import type { NextApiRequest, NextApiResponse } from 'next';

type Image = {
  url: string;
};

type ImagesApiResponse = {
  images: Image[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ImagesApiResponse>
) {
  const { variables } = req.body;
  // 画像生成AIを使って画像を生成する処理を実装します（モックデータを返す）
  const images = [
    { url: "https://picsum.photos/id/237/200/300" },
    { url: "https://picsum.photos/200/300?grayscale" },
    { url: "https://picsum.photos/200/300" },
  ];

  res.status(200).json({ images });
}