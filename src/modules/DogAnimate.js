import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import animationData from './lottie/82447-bookworm-doggo.json';

function LottieAnimation() {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      animationData: animationData,
    });
  }, []);

  return (
    <div className="animationCont" ref={container}></div>
  );
}

export default LottieAnimation;