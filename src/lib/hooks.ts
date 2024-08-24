import { useEffect, useState } from "react";

export const useTrackScreenWidth = () => {
  const [screenWidth, setDeviceWidth] = useState<number>(
    () => window.innerWidth,
  );

  useEffect(() => {
    const handleResize = () => {
      setDeviceWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenWidth]);

  return { screenWidth };
};
