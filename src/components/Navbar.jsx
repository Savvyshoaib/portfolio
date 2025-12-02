import dayjs from "dayjs";
import { navIcons } from "#constants";
import useWindowStore from "#store/window";
import { Dock } from "#components";
import { Search } from "lucide-react";

const Navbar = () => {
  const { openWindow } = useWindowStore();

  return (
    <nav aria-label="Windows taskbar">
      <div className="taskbar-left">
        <button
          type="button"
          className="start-btn"
          aria-label="Open Start menu"
          onClick={() => openWindow("fileexplore")}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0H9V9H0V0ZM11 0H20V9H11V0ZM0 11H9V20H0V11ZM11 11H20V20H11V11Z"
              fill="currentColor"
            />
          </svg>
        </button>

        <div className="taskbar-search" role="search">
          <Search size={16} strokeWidth={1.5} />
          <input
            type="text"
            placeholder="Type here to search"
            readOnly
            aria-label="Search Windows"
          />
        </div>
      </div>

      <div className="taskbar-center">
        <Dock />
      </div>

      <div className="taskbar-right">
        <ul className="system-icons">
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} alt={`icon-${id}`} />
            </li>
          ))}
        </ul>

        <time>{dayjs().format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
};

export default Navbar;
