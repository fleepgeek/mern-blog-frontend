import { useEffect, useState } from "react";

export const useTrackScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    let timeoutId: number | undefined;

    const handleResize = () => {
      clearTimeout(timeoutId);

      timeoutId = window.setTimeout(() => {
        // console.log(window.innerWidth);
        setScreenWidth(window.innerWidth);
      }, 150); // 150ms debounce
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return screenWidth;
};
