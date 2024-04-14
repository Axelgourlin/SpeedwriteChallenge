import { useState } from "react";
import { TextDisplayer } from "../TextDisplayer/TextDisplayer";
import { TextWriter } from "../TextWriter/TextWriter";
import { SelectText } from "../SelectText/SelectText";

import textData from "../../textData.json";

import "./GameBoard.scss";

export const GameBoard = () => {
  const [selectedText, setSelectedText] = useState<string>(textData["easy-1"]);
  const [writtenText, setWrittenText] = useState<string>("");

  const handleSelectTextChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedText = event.target.value;
    setSelectedText((textData as Record<string, string>)[selectedText]);
  };

  const handleWrittenTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentString = event.target.value;
    checkValidity(currentString);
    setWrittenText(currentString);
  };

  const cleanClasses = () => {
    const nodes = document.querySelectorAll("span");
    nodes.forEach((elem) =>
      elem.classList.remove(
        "textDisplayer__valid",
        "textDisplayer__invalid",
        "textDisplayer__valid--space",
        "textDisplayer__invalid--space"
      )
    );
  };

  const checkValidity = (currentString: string) => {
    cleanClasses();
    currentString.split("").forEach((char, index) => {
      const domNode = document.querySelector(`#char-${index}`);

      if (!domNode) return;

      if (char === selectedText[index]) {
        domNode?.classList.add("textDisplayer__valid");
        if (selectedText[index] === " ") {
          domNode?.classList.add("textDisplayer__valid--space");
        }
      } else {
        domNode?.classList.add("textDisplayer__invalid");
        if (selectedText[index] === " ") {
          domNode?.classList.add("textDisplayer__invalid--space");
        }
      }
    });
  };

  const reset = () => {
    setWrittenText(() => "");
    cleanClasses();
  };

  return (
    <div className="gameBoard">
      <SelectText label="Select Text" values={Object.keys(textData)} handleChange={handleSelectTextChange} />
      <TextDisplayer text={selectedText} />
      <TextWriter handleChange={handleWrittenTextChange} disable={writtenText === selectedText} value={writtenText} />
      <button className="button button__primary" onClick={reset}>
        Reset
      </button>
      <span style={{ display: writtenText === selectedText ? "inline" : "none" }}>Gongrats !</span>
    </div>
  );
};
