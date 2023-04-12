import { FC } from "react";

interface ImageListProps {
  imageUrls: string[];
}

const ImageList: FC<ImageListProps> = ({ imageUrls }) => {
  return (
    <div>
      {imageUrls.map((url, i) => (
        <img key={i} src={url} />
      ))}
    </div>
  );
};

export default ImageList;