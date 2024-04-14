import "./TextWriter.scss";

type props = {
  value: string;
  disable: boolean;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const TextWriter = ({ value, disable, handleChange }: props) => {
  return (
    <div className="textWriter">
      <textarea disabled={disable} value={value} onChange={handleChange}></textarea>
    </div>
  );
};
