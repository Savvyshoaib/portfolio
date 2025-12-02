import React from "react";
import { Tooltip } from "react-tooltip";
import { dockApps } from "#constants/index";
import useWindowStore from "#store/window";
import parse from "html-react-parser";

const Dock = () => {
  const { openWindow, closeWindow, windows } = useWindowStore();

  const toggleApp = (app) => {
    if (!app.canOpen) return;

    const window = windows[app.id];

    if (!window) {
      console.error(`Window not found for app: ${app.id}`);
      return;
    }

    if (window.isOpen) {
      closeWindow(app.id);
    } else {
      openWindow(app.id);
    }

    console.log(windows);
  };

  return (
    <section id="dock">
      <div className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => {
          const isActive = windows?.[id]?.isOpen;

          return (
            <div key={id} className="relative flex justify-center">
              <button
                type="button"
                className="dock-icon"
                aria-label={name}
                aria-pressed={isActive}
                data-tooltip-id="dock-tooltip"
                data-tooltip-content={name}
                data-tooltip-delay-show={150}
                disabled={!canOpen}
                onClick={() => toggleApp({ id, name, canOpen })}
              >
                {parse(icon)}
                <span
                  className={`indicator ${isActive ? "indicator-on" : ""}`}
                  aria-hidden="true"
                />
              </button>
            </div>
          );
        })}
        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  );
};

export default Dock;
