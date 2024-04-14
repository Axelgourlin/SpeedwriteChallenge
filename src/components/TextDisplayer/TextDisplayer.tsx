import "./TextDisplayer.scss";

type TextDisplayerProps = {
  text: string;
};

export const TextDisplayer = ({ text }: TextDisplayerProps) => {
  return (
    <div className="textDisplayer">
      {text.split("").map((char, index) => (
        <span key={`char-${index}`} id={`char-${index}`}>
          {char}
        </span>
      ))}
    </div>
  );
};
