interface Props {
  onChnage?: (value: boolean) => void;
}
const Switch = ({ onChnage = () => {} }: Props) => {
  return (
    <label className="switch">
      <input onChange={(e) => onChnage(e.target.checked)} type="checkbox" />
      <span className="slider"></span>
    </label>
  );
};

export default Switch;
