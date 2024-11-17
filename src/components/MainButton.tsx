import React from "react";
import styles from "./MainButton.module.scss";

interface Props {
  title: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const MainButton: React.FC<Props> = ({
  title,
  onClick,
  className,
  disabled,
  style,
}) => {
  return (
    <button
      className={`${styles.mainButton} ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {title}
    </button>
  );
};

export default MainButton;
