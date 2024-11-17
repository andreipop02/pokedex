import images from "core/constants/images";
import React from "react";

interface Props {
  image?: string;
}

const LoaderComponent: React.FC<Props> = ({ image = images.pikachuGif }) => {
  return <img src={image} alt="loader"/>;
};

export default LoaderComponent;
