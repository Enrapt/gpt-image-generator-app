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
    { url: "https://example.com/generated-image-1.jpg" },
    { url: "https://example.com/generated-image-2.jpg" },
    { url: "https://example.com/generated-image-3.jpg" },
  ];

  res.status(200).json({ images });
}