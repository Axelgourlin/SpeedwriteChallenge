import { Average } from "../components/GameBoard/GameBoard";

export const calculateAverage = ({
  typedText,
  selectedText,
  step,
  average,
}: {
  typedText: string;
  selectedText: string;
  step: number;
  average: Average;
}) => {
  const typedChars = typedText.split("");
  const selectedChars = selectedText.split("");
  const newAverage = average;
  if (typedChars[step] === selectedChars[step]) {
    newAverage.lengthOfGoodChars++;
  }
  newAverage.lengthOfTypedChars++;
  newAverage.accuracy = (newAverage.lengthOfGoodChars / newAverage.lengthOfTypedChars) * 100;
  return newAverage;
};
