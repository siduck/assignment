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
    if (scale >= 4 && event.deltaY < 0) return;

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
      className="box h-screen gap-2 p-2"
      onWheel={handleWheel}
    >
      <div
        className="lines [grid-area:framework]"
        style={tileStyle("framework")}
      ></div>

      <div className="lines [grid-area:icons]" style={tileStyle("icons")} />
      <div className="lines [grid-area:voice]" style={tileStyle("voice")} />
      <div className="lines [grid-area:colors]" style={tileStyle("colors")} />
      <div className="lines [grid-area:center]" style={tileStyle("center")} />
      <div className="lines [grid-area:logo]" style={tileStyle("logo")} />
      <div
        className="lines [grid-area:typography]"
        style={tileStyle("typography")}
      />

      <div className="lines [grid-area:motion]" style={tileStyle("motion")} />

      <div
        ref={tileRefs.framework}
        className="tile [grid-area:framework]"
        style={tileStyle("framework")}
      >
        Framework
      </div>
      <div
        ref={tileRefs.voice}
        className="tile [grid-area:voice]"
        style={tileStyle("voice")}
      >
        Voice & Tone
      </div>

      <div
        ref={tileRefs.logo}
        className="tile [grid-area:logo]"
        style={tileStyle("logo")}
      >
        Logo
      </div>

      <div
        ref={tileRefs.centeredDiv}
        className="tile !p-0 [grid-area:center]"
        style={tileStyle("centeredDiv")}
      >
        {scale <= 3 && (
          <div
            className="text-center"
            style={{
              fontSize: scale <= 2 ? "3rem" : scale < 3 ? "1.5rem" : undefined,
              margin: scale <= 2 ? "auto" : undefined,
              transform: scale <= 2 ? "translate(0, 0)" : "translate(0, 10px)",
            }}
          >
            <Icon />
          </div>
        )}

        {scale > 4 && (
          <p className="mb-auto p-2" style={{ fontSize: scale * 1.7 + "px" }}>
            At Dropbox, our Brand <br /> Guidelines help us <br /> infuse
            everything we <br /> make with identity
          </p>
        )}

        {scale > 3 && scale < 4 && (
          <p className="mb-auto p-2" style={{ fontSize: scale * 1.7 + "px" }}>
            From icons to illustration,
            <br />
            logos to language, this
            <br />
            collection is the foundation
            <br />
            for how Dropbox looks, feels,
            <br />
            and sounds like Dropbox.
          </p>
        )}
      </div>

      <div
        ref={tileRefs.icons}
        className="tile [grid-area:icons]"
        style={tileStyle("icons")}
      >
        Icons
      </div>

      <div
        ref={tileRefs.colors}
        className="tile [grid-area:colors]"
        style={tileStyle("colors")}
      >
        Colors
      </div>

      <div
        className="tile  [grid-area:typography]"
        ref={tileRefs.typography}
        style={tileStyle("typography")}
      >
        Typography
      </div>

      <div
        ref={tileRefs.imagery}
        className="tile [grid-area:imagery]"
        style={tileStyle("imagery")}
      >
        Imagery
      </div>

      <div
        className="tile [grid-area:motion]"
        ref={tileRefs.motion}
        style={tileStyle("motion")}
      >
        Motion
      </div>
    </div>
  );
}

export default App;
