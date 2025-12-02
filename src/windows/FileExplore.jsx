import React from "react";
import WindowWrapper from "#hoc/WindowWrapper";
import WindowControls from "#components/WindowControls";
import { locations } from "#constants";
import useLocationStore from "#store/location";
import clsx from "clsx";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  RefreshCcw,
  FolderPlus,
  LayoutGrid,
  MoreHorizontal,
} from "lucide-react";
import useWindowStore from "#store/window";

const FileExplore = () => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();

  const openItem = (item) => {
    if (item.fileType === "pdf") return openWindow("resume");
    if (item.kind === "folder") return setActiveLocation(item);
    if (["fig", "url"].includes(item.fileType) && item.href)
      return window.open(item.href, "_blank");

    openWindow(`${item.fileType}${item.kind}`, item);
  };

  const renderList = (name, items) => (
    <div>
      <h3>{name}</h3>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(
              item.id == activeLocation.id ? "active" : "not-active"
            )}
          >
            <img src={item.icon} className="w-4" alt={item.name} />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <>
      <div id="window-header" className="explorer-header">
        <div className="header-left">
          <WindowControls target="fileexplore" />
          <div>
            <p className="title">File Explorer</p>
            <span>Quick access</span>
          </div>
        </div>

        <div className="header-actions">
          <button type="button" className="pill primary">
            <FolderPlus size={14} />
            New
          </button>
          <button type="button" className="pill">
            <LayoutGrid size={14} />
            View
          </button>
          <button type="button" className="ghost-btn" aria-label="More options">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      <div className="explorer-command">
        <div className="cmd-nav">
          <button type="button" aria-label="Go back" className="ghost-btn">
            <ChevronLeft size={16} />
          </button>
          <button type="button" aria-label="Go forward" className="ghost-btn">
            <ChevronRight size={16} />
          </button>
          <button type="button" aria-label="Refresh" className="ghost-btn">
            <RefreshCcw size={16} />
          </button>
        </div>

        <div className="cmd-path" aria-label="Current path">
          <span>This PC</span>
          <span className="separator">›</span>
          <span>{activeLocation?.name}</span>
        </div>

        <div className="cmd-search">
          <Search size={16} />
          <input type="text" placeholder="Search this folder" readOnly />
        </div>
      </div>

      <div className="explorer-body">
        <div className="sidebar">
          {renderList("Pinned", Object.values(locations))}
          {renderList("Workspace", locations.work.children)}
        </div>

        <ul className="content">
          {activeLocation?.children.map((item) => (
            <li
              key={item.id}
              className={item.position}
              onClick={() => openItem(item)}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const FileExploreWindow = WindowWrapper(FileExplore, "fileexplore");

export default FileExploreWindow;
