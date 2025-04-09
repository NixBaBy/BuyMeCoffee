import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
const Loading = () => {
  return (
    <DotLottieReact
      src="/anime.json"
      loop
      autoplay
      style={{ width: 300, height: 300 }}
    ></DotLottieReact>
  );
};

export default Loading;
