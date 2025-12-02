import React from "react";
import useWindowStore from "#store/window";
import { Minus, Square, X } from "lucide-react";

const WindowControls = ({ target }) => {
  const { closeWindow, focusWindow } = useWindowStore();

  return (
    <div id="window-controls" role="group" aria-label="Window controls">
      <button
        type="button"
        className="window-btn"
        data-variant="minimize"
        aria-label="Minimize window"
        onClick={() => closeWindow(target)}
      >
        <Minus size={12} strokeWidth={2} />
      </button>

      <button
        type="button"
        className="window-btn"
        data-variant="maximize"
        aria-label="Maximize window"
        onClick={() => focusWindow(target)}
      >
        <Square size={12} strokeWidth={2} />
      </button>

      <button
        type="button"
        className="window-btn"
        data-variant="close"
        aria-label="Close window"
        onClick={() => closeWindow(target)}
      >
        <X size={12} strokeWidth={2} />
      </button>
    </div>
  );
};

export default WindowControls;
