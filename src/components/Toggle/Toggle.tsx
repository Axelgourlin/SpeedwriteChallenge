import "./toggle.scss";

export interface ToggleProps {
  isChecked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Toggle = ({ isChecked, handleChange }: ToggleProps) => {
  return (
    <div className="toggle__container">
      <input type="checkbox" id="check" className="toggle" checked={isChecked} onChange={handleChange} />
      <label htmlFor="check">{}</label>
    </div>
  );
};
