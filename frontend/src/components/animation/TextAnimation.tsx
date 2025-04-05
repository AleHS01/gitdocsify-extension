import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import React, { useEffect } from "react";
import CursorBlinker from "./CursorBlinker";

type TextAnimationProp = {
  baseText: string;
  durationInSec: number;
};

const TextAnimation: React.FC<TextAnimationProp> = ({
  baseText,
  durationInSec = 1,
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.slice(0, latest)
  );

  useEffect(() => {
    const controls = animate(count, baseText.length, {
      type: "tween",
      duration: durationInSec,
      ease: "easeInOut",
    });
    return controls.stop;
  }, [count, baseText, durationInSec]);

  return (
    <span>
      <motion.span>{displayText}</motion.span>
      <CursorBlinker />
    </span>
  );
};

export default TextAnimation;
