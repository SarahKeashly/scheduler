import { useState } from "react";

const useVisualMode = function (initial) {
  const [history, setHistory] = useState([initial]);

  const transition = function (mode, replace = false) {
    setHistory(
      replace
        ? [...history.slice(0, history.length - 1), mode]
        : [...history, mode]
    );
  };

  const back = function () {
    if (history.length < 2) {
      return;
    }

    setHistory((prev) => {
      const newHistory = [...prev];
      newHistory.pop();

      return [...prev.slice(0, prev.length - 1)];
    });
  };

  const mode = history.slice(-1)[0];
  return { mode, transition, back };
};

export default useVisualMode;
