import { useState, useRef, useLayoutEffect, useEffect } from "react";

const Icon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.2em"
    height="1.2em"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="m3 6.2l5 3.19l5-3.19L8 3zm10 0l5 3.19l5-3.19L18 3zM3 12.55l5 3.19l5-3.19l-5-3.2zm15-3.2l-5 3.2l5 3.19l5-3.19zM8.03 16.8l5.01 3.2l5-3.2l-5-3.19z"
    />
  </svg>
);

import "./App.css";

function App() {
  const [scale, setScale] = useState(1);
  const [offsets, setOffsets] = useState({});
  const containerRef = useRef(null);

  const tileRefs = {
    framework: useRef(null),
    voice: useRef(null),
    logo: useRef(null),
    typography: useRef(null),
    centeredDiv: useRef(null),
    icons: useRef(null),
    colors: useRef(null),
    imagery: useRef(null),
    motion: useRef(null),
  };

  const calcOffsets = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;
    const centerY = containerRect.top + containerRect.height / 2;

    const newOffsets = {};
    for (let key in tileRefs) {
      const rect = tileRefs[key].current.getBoundingClientRect();
      const tileCenterX = rect.left + rect.width / 2;
      const tileCenterY = rect.top + rect.height / 2;
      newOffsets[key] = [tileCenterX - centerX, tileCenterY - centerY];
    }
    setOffsets(newOffsets);
  };

  useLayoutEffect(() => {
    calcOffsets();
    window.addEventListener("resize", calcOffsets);
    return () => window.removeEventListener("resize", calcOffsets);
  }, []);

  const handleWheel = (event) => {
    setScale((s) => Math.max(1, s + event.deltaY * -0.004));
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp") {
      setScale((s) => Math.max(1, s + 0.1));
    } else if (event.key === "ArrowDown") {
      setScale((s) => Math.max(1, s - 0.1));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const tileStyle = (key) => {
    const [x, y] = offsets[key] || [0, 0];
    return {
      transform: `scale(${scale}) translate(${x * (scale - 1)}px, ${y * (scale - 1)}px)`,
      transition: "transform 0.20s ease-out",
    };
  };

  return (
    <div
      ref={containerRef}
      className="p-3 grid grid-cols-[1fr_1fr_50px_1fr_1fr] grid-rows-[1fr_50px_1fr] gap-3 h-screen"
      onWheel={handleWheel}
      tabIndex={0} // so arrow keys work
    >
      <div
        ref={tileRefs.framework}
        className="tile col-span-1 row-span-2"
        style={tileStyle("framework")}
      >
        Framework
      </div>
      <div
        ref={tileRefs.voice}
        className="tile col-span-2 row-span-1"
        style={tileStyle("voice")}
      >
        Voice & Tone
      </div>
      <div
        ref={tileRefs.logo}
        className="tile col-span-1 row-span-2"
        style={tileStyle("logo")}
      >
        Logo
      </div>
      <div
        ref={tileRefs.typography}
        className="tile col-span-1 row-span-1"
        style={tileStyle("typography")}
      >
        Typography
      </div>

      <div
        ref={tileRefs.centeredDiv}
        className="tile col-span-1 row-start-2 col-start-3 row-span-1 !flex flex-col  p-3 rounded"
        style={tileStyle("centeredDiv")}
      >
        {scale >= 3 && (
          <p className="text-black">
            At Dropbox, our Brand Guidelines help us infuse everything we make
            with identity
          </p>
        )}

        {scale > 2 && (
          <div className="mt-auto bg-blue-300">
            <Icon />
          </div>
        )}

        

        {scale <=  2 && (
          <div className="text-3xl mb-auto">
            <Icon />
          </div>
        )}
      </div>

      <div
        ref={tileRefs.icons}
        className="tile col-span-1 row-span-1 row-start-3"
        style={tileStyle("icons")}
      >
        Icons
      </div>
      <div
        ref={tileRefs.colors}
        className="tile col-span-1 row-span-2"
        style={tileStyle("colors")}
      >
        Colors
      </div>
      <div
        ref={tileRefs.imagery}
        className="tile col-span-2 row-span-1"
        style={tileStyle("imagery")}
      >
        Imagery
      </div>
      <div
        ref={tileRefs.motion}
        className="tile col-span-1 row-span-2 row-start-2"
        style={tileStyle("motion")}
      >
        Motion
      </div>
    </div>
  );
}

export default App;
