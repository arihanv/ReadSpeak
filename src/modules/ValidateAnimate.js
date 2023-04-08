import React, { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";
import incorrect from "./lottie/91878-bouncy-fail.json";
import correct from "./lottie/91876-success-animation.json";

function LottieAnimation(props) {
  const container = useRef(null);
  const [animationInstance, setAnimationInstance] = useState(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: container.current,
      animationData: props.correct ? correct : incorrect,
      loop: false,
      prerender:false,
      autoplay: false,
      autoloadSegments: false,
    });

    anim.setSpeed(1.75);

    setAnimationInstance(anim);

    return () => {
      anim.destroy();
    };
  }, [props.correct]);

  useEffect(() => {
  if (animationInstance) {
    animationInstance.play();
  }
  return () => {
    if (animationInstance) {
      animationInstance.stop();
    }
  };
}, [animationInstance, props.word]);


  return <div className="animationCont" ref={container}></div>;
}

export default LottieAnimation;
