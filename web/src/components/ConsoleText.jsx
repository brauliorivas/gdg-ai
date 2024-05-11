import { useEffect, useState } from 'react';

export default function ConsoleText({ words, fonts }) {
  const [currentWord, setCurrentWord] = useState('');
  const [isShowing, setIsShowing] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let isAdding = true;
    let letterCount = 1;
    let timeout;

    const updateText = () => {
      if (isAdding) {
        if (letterCount <= words[index].length) {
          setCurrentWord(words[index].substring(0, letterCount));
          letterCount++;
          timeout = setTimeout(updateText, 120); // speed of typing
        } else {
          isAdding = false;
          timeout = setTimeout(updateText, 1000); // pause at end
        }
      } else {
        if (letterCount > 0) {
          setCurrentWord(words[index].substring(0, letterCount));
          letterCount--;
          timeout = setTimeout(updateText, 60); // speed of deleting
        } else {
          isAdding = true;
          setIndex(prev => (prev + 1) % words.length); // move to next word
          timeout = setTimeout(updateText, 120);
        }
      }
    };

    updateText();

    const interval = setInterval(() => {
      setIsShowing(isVisible => !isVisible);
    }, 400);
    console.log('words', fonts[index]);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout); // clear the timeout when component unmounts or dependencies change
    };
  }, [index, words, fonts]);

  return (
    <div className='relative mx-auto text-center text-[160px] font-bold text-black dark:text-[rgb(252,118,00)]' style={{ fontFamily: fonts[index] }}>
      <span className='font-semibold' style={{ fontFamily: fonts[index] }} >{currentWord}</span>
      <div className={`inline-block relative top-[-0.14em] ml-2.5 ${isShowing ? '' : 'opacity-0'}`}>
        &#95;
      </div>
    </div>
  );
}