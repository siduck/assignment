import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="p-3 grid grid-cols-[1fr_1fr_50px_1fr_1fr] grid-rows-[1fr_50px_1fr]  gap-3 h-screen bg-red">
      <div className="tile row-span-2"> Framework</div>
      <div className="tile col-span-2"> Voice & Tone</div>
      <div className="tile row-span-2"> Logo</div>
      <div className="tile "> Typography</div>

      <div className="tile row-start-2 col-start-3">
        DROO
      </div>

      <div className="tile row-start-3 "> Icons</div>
      <div className="tile row-span-2  "> Colors</div>
      <div className="tile col-span-2"> Imagery</div>
      <div className="tile col-start-5  row-span-2 row-start-2"> Motion</div>
    </div>
  );
}

export default App;
