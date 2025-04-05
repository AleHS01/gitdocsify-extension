import { useEffect, useRef, useState } from "react";

type EncryptedTextProps = {
  text: string;
};

const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 20;
const CHARS = "!@#$%^&*():{};|,.<>/?";

const DecryptedTextAnimation: React.FC<EncryptedTextProps> = ({
  text: targetText,
}) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [displayText, setDisplayText] = useState(targetText);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = targetText
        .split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }
          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          return CHARS[randomCharIndex];
        })
        .join("");

      setDisplayText(scrambled);
      pos++;

      if (pos >= targetText.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setDisplayText(targetText);
  };

  useEffect(() => {
    scramble();
    return stopScramble;
  }, [targetText]);

  return (
    <span
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      style={{
        fontWeight: 500,
      }}
    >
      {displayText}
    </span>
  );
};

export default DecryptedTextAnimation;
