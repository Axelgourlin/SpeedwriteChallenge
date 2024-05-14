export interface AverageAccuracyProps {
  accuracy: number | undefined;
}

export const AverageAccuracy = ({ accuracy }: AverageAccuracyProps) => {
  if (accuracy === undefined) return <></>;
  else {
    return (
      <span style={{ display: accuracy || accuracy === 0 ? "inline" : "none" }}>
        Accuracy: {accuracy % 1 === 0 ? accuracy : accuracy.toFixed(2)}%
      </span>
    );
  }
};
