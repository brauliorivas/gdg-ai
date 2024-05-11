import { useEffect, useState } from 'react';

export default function ConsoleText({ words}) {
  const [currentWord, setCurrentWord] = useState('');
  const [isShowing, setIsShowing] = useState(true);

  useEffect(() => {
    let colorIndex = 0;
    let wordIndex = 0;
    let letterCount = 1;
    let isAdding = true;

    const updateText = () => {
      setTimeout(() => {
        setCurrentWord(words[wordIndex].substring(0, letterCount));
        if (isAdding) {
          if (letterCount === words[wordIndex].length + 1) {
            isAdding = false;
            setTimeout(() => {
              updateText();
            }, 1000);
          } else {
            letterCount++;
            updateText();
          }
        } else {
          if (letterCount === 0) {
            isAdding = true;
            wordIndex = (wordIndex + 1) % words.length;
            updateText();
          } else {
            letterCount--;
            updateText();
          }
        }
      }, isAdding ? 120 : 60);
    };

    updateText();

    const interval = setInterval(() => {
      setIsShowing(isVisible => !isVisible);
    }, 400);

    return () => clearInterval(interval);
  }, [words]);

  return (
    <div className='relative mx-auto  text-center text-[160px] font-bold text-black dark:text-[rgb(252,118,00)] ' style={{ fontFamily: 'Khula' }}>
      <span >{currentWord}</span>
      <div className={`inline-block relative top-[-0.14em] ml-2.5 ${isShowing ? '' : 'opacity-0'}`}>
        &#95;
      </div>
    </div>
  );
}