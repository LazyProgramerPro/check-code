import { useEffect, useState } from 'react';
type IWindow = [number, number]
const useWindowResize = (): IWindow => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState<number>(window.innerWidth);
  useEffect(() => {
    function updateSize() {
      setScreenHeight(document.documentElement.clientHeight);
      setScreenWidth(document.documentElement.clientWidth)
    }

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return [screenWidth, screenHeight]
} 

export default useWindowResize;
