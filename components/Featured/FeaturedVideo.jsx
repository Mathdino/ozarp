import React, { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import AppScreen from "../AppScreen/AppScreen";

const FeaturedVideo = ({ refForward, ...props }) => {
  const ref = useRef(null);

  const variants = {
    initial: { scale: 1, x: 0, y: 0 },
    animate: { scale: 1.08, x: 0, y: 0 },
  };

  const { scrollYProgress } = useScroll({
    target: refForward,
    layoutEffect: false,
  });

  const [progress, setProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setProgress(value);
  });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="initial"
      animate={progress > 0.5 ? "animate" : "initial"}
      className="relative md:absolute mx-auto md:mx-0 mt-4 md:mt-0 md:top-[60vh] md:left-16 md:translate-x-0 md:translate-y-0 z-30 w-[82vw] md:w-[28vw] max-w-[22rem] md:max-w-[500px] aspect-[3/4] md:aspect-[856/1024] overflow-hidden rounded-3xl"
      {...props}
    >
      <AppScreen />
    </motion.div>
  );
};

export default FeaturedVideo;
