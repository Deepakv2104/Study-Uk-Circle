import React, { useEffect, useState } from 'react';
import './Typing.css'; // Ensure you import your CSS styles

const TypingEffect = ({ texts, typingSpeed = 700, backSpeed = 500, pause = 2000 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentIndex];

    if (isDeleting) {
      if (charIndex > 0) {
        setTimeout(() => {
          setDisplayText(currentText.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, backSpeed);
      } else {
        setIsDeleting(false);
        setCurrentIndex((currentIndex + 1) % texts.length);
      }
    } else {
      if (charIndex < currentText.length) {
        setTimeout(() => {
          setDisplayText(currentText.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, typingSpeed);
      } else {
        setTimeout(() => {
          setIsDeleting(true);
        }, pause);
      }
    }
  }, [displayText, charIndex, isDeleting, texts, typingSpeed, backSpeed, pause, currentIndex]);

  return <span className="typing-effect">{displayText}</span>;
};

export default TypingEffect;
