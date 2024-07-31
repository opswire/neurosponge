import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwind.config";
import React from "react";

export function useWindowSize() {
  const fullConfig = resolveConfig(tailwindConfig);
  const {
    theme: { screens },
  } = fullConfig;

  const [windowSize, setWindowSize] = React.useState<
    "lg" | "md" | "sm" | "default"
  >("default");

  React.useEffect(() => {
    const lgBreakpoint = parseInt(screens.lg.replace("px", ""));
    const mdBreakpoint = parseInt(screens.md.replace("px", ""));
    const smBreakpoint = parseInt(screens.sm.replace("px", ""));
    function handleResize() {
      if (window.innerWidth >= lgBreakpoint) {
        setWindowSize("lg");
      } else if (window.innerWidth >= mdBreakpoint) {
        setWindowSize("md");
      } else if (window.innerWidth >= smBreakpoint) {
        setWindowSize("sm");
      } else {
        setWindowSize("default");
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
