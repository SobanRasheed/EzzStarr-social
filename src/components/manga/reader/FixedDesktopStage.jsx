import { useEffect, useRef, useState } from "react";

/* =========================================================================
   Fixed desktop canvas.

   The reader frames in Figma are all 1920px wide and the layout is desktop
   only — it must NOT reflow between a 1920 monitor and a 1366 laptop. So the
   children are laid out at exactly 1920px and the whole canvas is scaled to
   fit the viewport. Every desktop and laptop therefore sees an identical
   layout, just at a different size.

   Scale is capped at 1: on wider-than-1920 screens the design renders at its
   native size, centred, rather than being upscaled and going soft.
========================================================================= */

const DESIGN_WIDTH = 1920;

const FixedDesktopStage = ({ children }) => {
  const stageRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [scaledHeight, setScaledHeight] = useState(0);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const update = () => {
      const next = Math.min(1, window.innerWidth / DESIGN_WIDTH);
      setScale(next);
      // The transform doesn't affect layout height, so mirror it onto the
      // wrapper — otherwise the page scrolls to the unscaled height.
      setScaledHeight(el.offsetHeight * next);
    };

    update();
    window.addEventListener("resize", update);
    const observer = new ResizeObserver(update);
    observer.observe(el);

    return () => {
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="relative w-full overflow-x-hidden"
      style={{ height: scaledHeight ? `${scaledHeight}px` : undefined }}
    >
      <div
        ref={stageRef}
        style={{
          position: "absolute",
          top: 0,
          left: `calc(50% - ${(DESIGN_WIDTH / 2) * scale}px)`,
          width: `${DESIGN_WIDTH}px`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default FixedDesktopStage;
