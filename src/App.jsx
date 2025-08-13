import { useState, useRef, useLayoutEffect, useEffect } from "react";

function App() {
  const [scale, setScale] = useState(1);
  const [offsets, setOffsets] = useState({});
  const containerRef = useRef(null);

  const tileRefs = {
    framework: useRef(null),
    voice: useRef(null),
    logo: useRef(null),
    typography: useRef(null),
    center: useRef(null),
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
      gridArea: key,
    };
  };

  return (
    <div
      ref={containerRef}
      className="box h-screen gap-2 p-2"
      onWheel={handleWheel}
    >
      {scale > 1 && (
        <>
          <div
            className="lines [grid-area:framework]"
            style={tileStyle("framework")}
          ></div>

          <div className="lines [grid-area:icons]" style={tileStyle("icons")} />
          <div className="lines [grid-area:voice]" style={tileStyle("voice")} />
          <div
            className="lines [grid-area:colors]"
            style={tileStyle("colors")}
          />
          <div
            className="lines [grid-area:center]"
            style={tileStyle("center")}
          />
          <div className="lines [grid-area:logo]" style={tileStyle("logo")} />
          <div
            className="lines [grid-area:typography]"
            style={tileStyle("typography")}
          />

          <div
            className="lines [grid-area:imagery]"
            style={tileStyle("imagery")}
          />
          <div
            className="lines [grid-area:motion]"
            style={tileStyle("motion")}
          />
        </>
      )}

      <div
        ref={tileRefs.framework}
        className="tile [grid-area:framework] bg-[#283750] text-[#A2B6CF]"
        style={tileStyle("framework")}
      >
        Framework
      </div>

      <div
        ref={tileRefs.voice}
        className="tile [grid-area:voice] bg-[#fad24b] text-[#684505] !pb0 group
                    *:transition-transform duration-300"
        style={tileStyle("voice")}
      >
        Voice & Tone
        <div className="i-fa7-solid:quote-left-alt mt-auto text-7rem group-hover:translate-x-2rem " />
        <div className="i-fa7-solid:quote-right-alt m-(t-auto l-auto) text-7rem group-hover:-translate-x-2rem" />
      </div>

      <div
        ref={tileRefs.logo}
        className="tile [grid-area:logo] bg-[#3dd3ee] text-[#002C3B] group"
        style={tileStyle("logo")}
      >
        Logo
        <div className="i-ph:dropbox-logo-fill group-hover:animate-(bounce-in duration-800)  text-8rem m-(t-auto l-auto)" />
      </div>

      <div
        ref={tileRefs.center}
        className="tile !p-0 [grid-area:center] bg-[#0061FF] text-white"
        style={tileStyle("center")}
      >
        {scale > 4 && (
          <p
            className="p-2 leading-normal !tracking-normal"
            style={{ fontSize: ".4rem" }}
          >
            At Dropbox, our Brand <br /> Guidelines help us <br /> infuse
            everything we <br /> make with identity
          </p>
        )}

        {scale > 3 && scale < 4 && (
          <p
            className="p-2 leading-normal  !tracking-normal"
            style={{ fontSize: ".4rem" }}
          >
            From icons to illustration, logos to language, this collection is
            the foundation for how Dropbox looks, feels, and sounds like
            Dropbox.
          </p>
        )}

        <div
          className={`${scale <= 2 ? "m-auto text-[3rem]" : "mt-auto text-sm"}`}
        >
          <div className="i-mdi:dropbox" />
        </div>
      </div>

      <div
        ref={tileRefs.icons}
        className="tile [grid-area:icons] bg-[#b4dc19] text-[#00512B]"
        style={tileStyle("icons")}
      >
        Icons
        <div className="i-si:lock-line mt-auto text-10rem -m-(x2rem y1rem)" />
      </div>

      <div
        ref={tileRefs.colors}
        className="tile group [grid-area:colors] bg-[#ff8c19] text-[#5B2C00]
                      "
        style={tileStyle("colors")}
      >
        Colors
        <div className="mt-auto ml-auto w-14rem relative">
          <div
            className="bg-[#BE4B0A] size-7rem flex 
                 before:(content-[''] m-auto bg-[#5B2C00] size-2/3 rounded-full group-hover:(!bg-transparent outline))
                 transition-transform duration-300
                 group-hover:(translate-x-[7rem] !bg-transparent outline )"
          />
          <div
            className="bg-[#5B2C00] size-7rem flex mt3
                       before:(content-[''] m-auto bg-[#BE4B0A] size-2/3 rounded-full group-hover:(!bg-transparent outline))
                       transition-transform duration-300 translate-x-[7rem]
                       group-hover:(translate-x-0 !bg-transparent outline)"
          />
        </div>
      </div>

      <div
        className="tile [grid-area:typography] bg-[#fa551e] text-[#5A1E00] group"
        ref={tileRefs.typography}
        style={tileStyle("typography")}
      >
        Typography
        <span
          className="m-(t-auto l-auto) mb10 text-9rem
           group-hover:(text-black [-webkit-text-stroke:_3px_white]) "
        >
          Aa
        </span>
      </div>

      <div
        ref={tileRefs.imagery}
        className="tile [grid-area:imagery] bg-[#892055] text-[#F4D0E3]"
        style={tileStyle("imagery")}
      >
        Imagery
        <div className="i-line-md:image-filled text-10rem m-(t-auto l-auto)" />
      </div>

      <div
        className="tile [grid-area:motion] bg-[#c8aff0] text-[#3E2B61]"
        ref={tileRefs.motion}
        style={tileStyle("motion")}
      >
        Motion
      </div>
    </div>
  );
}

export default App;
