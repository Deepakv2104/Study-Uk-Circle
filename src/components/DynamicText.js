import React, { useState, useEffect } from 'react';

const DynamicText = ({ phrases, className }) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [index, setIndex] = useState(1);
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const period = 2000; // Adjust as needed

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker); };
  }, [text, isDeleting]);

  const tick = () => {
    let i = loopNum % phrases.length;
    let fullText = phrases[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum((prevLoopNum) => prevLoopNum + 1);
      setIndex(1);
      setDelta(100);
    }
    // Removed the erroneous setIndex call
  };

  return <span className={className}>{text}</span>;
};

export default DynamicText;
