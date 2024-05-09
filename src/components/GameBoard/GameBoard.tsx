import { useState } from "react";
import { TextDisplayer } from "../TextDisplayer/TextDisplayer";
import { TextWriter } from "../TextWriter/TextWriter";
import { SelectText } from "../SelectText/SelectText";
import { Counter } from "../Counter/Counter";

import textData from "../../textData.json";

import "./GameBoard.scss";

export const GameBoard = () => {
  const [selectedText, setSelectedText] = useState<string>(textData["easy-1"]);
  const [writtenText, setWrittenText] = useState<string>("");
  const [count, setCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState<undefined | number>();

  const handleSelectTextChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedText = event.target.value;
    setSelectedText((textData as Record<string, string>)[selectedText]);
  };

  const handleWrittenTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isPlaying) {
      setIsPlaying(true);
      const intervalId = startCounter();
      setIntervalId(intervalId);
    }

    const currentString = event.target.value;
    checkValidity(currentString);
    setWrittenText(currentString);

    if (currentString === selectedText) {
      setIsPlaying(false);
      clearInterval(intervalId);
    }
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

  const startCounter = () => {
    const intervalId = setInterval(() => setCount((prevCount) => prevCount + 1), 10);
    return intervalId;
  };

  const reset = () => {
    setWrittenText(() => "");
    cleanClasses();
    setCount(0);
    setIsPlaying(false);
    clearInterval(intervalId);
  };

  return (
    <div className="gameBoard">
      <div className="gameBoard__panel">
        <SelectText label="Select Text" values={Object.keys(textData)} handleChange={handleSelectTextChange} />
        <Counter count={count} />
      </div>
      <TextDisplayer text={selectedText} />
      <TextWriter handleChange={handleWrittenTextChange} disable={writtenText === selectedText} value={writtenText} />
      <button className="button button__primary" onClick={reset}>
        Reset
      </button>
      <span style={{ display: writtenText === selectedText ? "inline" : "none" }}>Gongrats !</span>
    </div>
  );
};
