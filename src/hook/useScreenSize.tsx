import { useEffect, useState } from "react";

type ScreenSize = "sm" | "md" | "lg";

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<ScreenSize>();

  useEffect(() => {
    function getScreenSize(): ScreenSize {
      if (window.innerWidth < 640) return "sm";
      if (window.innerWidth < 768) return "md";
      return "lg";
    }

    function handleResize() {
      setScreenSize(getScreenSize());
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
};
