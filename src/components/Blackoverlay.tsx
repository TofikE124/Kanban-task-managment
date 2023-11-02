interface Props {
  className?: string;
  onClick?: () => void;
}

const Blackoverlay = ({ onClick = () => {}, className }: Props) => {
  return (
    <div
      onClick={() => onClick()}
      className={`black-overlay ${className}`}
    ></div>
  );
};

export default Blackoverlay;
