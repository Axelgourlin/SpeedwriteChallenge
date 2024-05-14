import "./Counter.scss";

export const Counter = ({ count }: { count: number }) => {
  const milliseconds = count;
  const seconds = milliseconds / 100;
  const minutes = seconds / 60;

  const formattedMinutes = `${String(Math.floor(minutes % 60)).padStart(2, "0")}`;
  const formattedSeconds = `${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
  const formattedMilliseconds = String(Math.floor(milliseconds % 100)).padStart(2, "0");

  return (
    <div className="counter" style={{ display: count ? "block" : "none" }}>
      <span>Time: </span>
      <span className="counter__item" style={minutes < 1 ? {} : { opacity: 1 }}>
        {formattedMinutes}
      </span>
      <span className="counter__item" style={minutes < 1 ? {} : { opacity: 1 }}>
        :
      </span>
      <span className="counter__item" style={seconds < 1 ? {} : { opacity: 1 }}>
        {formattedSeconds}
      </span>
      <span className="counter__item" style={seconds < 1 ? {} : { opacity: 1 }}>
        :
      </span>
      <span className="counter__item">{formattedMilliseconds}</span>
    </div>
  );
};
