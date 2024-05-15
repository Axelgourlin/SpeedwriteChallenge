import { useState } from "react";

import { Counter } from "../Counter/Counter";
import { SelectText } from "../SelectText/SelectText";
import { TextDisplayer } from "../TextDisplayer/TextDisplayer";
import { TextWriter } from "../TextWriter/TextWriter";
import { AverageAccuracy } from "../AverageAccuracy";

import textData from "../../textData.json";

import "./GameBoard.scss";
import { calculateAverage } from "../../utils/calculateAverage";

export type Average = {
  lengthOfGoodChars: number;
  lengthOfTypedChars: number;
  accuracy: number | undefined;
};

export const GameBoard = () => {
  const [selectedText, setSelectedText] = useState<string>(textData["easy-1"]);
  const [gameStep, setGameStep] = useState<{
    writtenText: string;
    step: number;
  }>({
    writtenText: "",
    step: 0,
  });

  const initialAverage = {
    lengthOfGoodChars: 0,
    lengthOfTypedChars: 0,
    accuracy: undefined,
  } satisfies Average;
  const [average, setAverage] = useState<Average>(initialAverage);

  const [count, setCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState<undefined | number>();

  const handleSelectTextChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedText = event.target.value;
    setSelectedText((textData as Record<string, string>)[selectedText]);
    reset();
  };

  const handleWrittenTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isPlaying) {
      setIsPlaying(true);
      const intervalId = startCounter();
      setIntervalId(intervalId);
    }

    const currentString = event.target.value;
    checkValidity(currentString);
    setGameStep((prev) => {
      if (currentString.length > prev.writtenText.length) {
        const newAverage = calculateAverage({
          typedText: currentString,
          selectedText,
          step: prev.step,
          average: average,
        });
        setAverage(newAverage);
        return {
          writtenText: currentString,
          step: prev.step + 1,
        };
      }

      return {
        writtenText: currentString,
        step: prev.step - 1,
      };
    });

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

      const isValidChar = char === selectedText[index];

      if (isValidChar) {
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
    setGameStep(() => ({
      writtenText: "",
      step: 0,
    }));
    cleanClasses();
    setCount(0);
    setIsPlaying(false);
    clearInterval(intervalId);
    setAverage(initialAverage);
  };

  return (
    <div className="gameBoard">
      <div className="gameBoard__panel">
        <SelectText label="Select Text" values={Object.keys(textData)} handleChange={handleSelectTextChange} />
        <div className="gameBoard__panel__stats">
          <AverageAccuracy accuracy={average.accuracy} />
          <Counter count={count} />
        </div>
      </div>
      <TextDisplayer text={selectedText} />
      <TextWriter
        handleChange={handleWrittenTextChange}
        disable={gameStep.writtenText === selectedText}
        value={gameStep.writtenText}
      />
      <button className="button button__primary" onClick={reset}>
        Reset
      </button>
      <span
        style={{
          visibility: gameStep.writtenText === selectedText ? "visible" : "hidden",
          position: "absolute",
          bottom: "2rem",
        }}
      >
        Gongrats !
      </span>
    </div>
  );
};
