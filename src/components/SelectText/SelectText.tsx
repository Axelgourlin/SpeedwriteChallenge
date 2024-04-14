import "./SelectText.scss";

type Props = {
  label: string;
  values: string[];
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectText = ({ label, values, handleChange }: Props) => {
  return (
    <div className="select">
      <span className="select__label">{label} :</span>
      <select className="select__input" onChange={handleChange}>
        {values.map((value, index) => (
          <option key={value + index} value={value}>
            {value.split("-").join(" ")}
          </option>
        ))}
      </select>
    </div>
  );
};
