import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import animationData from './lottie/37101-cute-little-panda-sleeping.json';

function PandaAnimation() {
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

export default PandaAnimation;