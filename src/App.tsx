import { GameBoard } from "./components/GameBoard/GameBoard";
import { Toggle } from "./components/Toggle/Toggle";
import { useLocalStorage } from "./hooks/useLocalStorage";

import "./App.css";

export function App() {
  const isDarkPreferenceTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDarkMode, setIsDarkMode] = useLocalStorage("darkMode", isDarkPreferenceTheme);

  return (
    <div className="app" data-theme={isDarkMode ? "dark" : "light"}>
      <Toggle isChecked={isDarkMode} handleChange={() => setIsDarkMode(!isDarkMode)} />
      <GameBoard />
    </div>
  );
}
