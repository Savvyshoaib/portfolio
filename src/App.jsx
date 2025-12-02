import gsap from "gsap";
import Draggable from "gsap/Draggable";

import { Navbar, Welcome, Dock } from "#components";
import { Terminal, Safari, Resume, FileExplore } from "#windows";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      {/* <Welcome /> */}
      {/* <Dock /> */}

      <Terminal />
      <Safari />
      <Resume />
      <FileExplore />
    </main>
  );
};

export default App;
