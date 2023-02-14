import { useEffect } from "react";
import { useState } from "react";

const UseSkillRandom = (value:number) => {
  const [languageValue, setlanguageValue] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setlanguageValue((prevState) => {
        const diff = Math.random() * 10;
        return Math.min(prevState + diff, value);
      });
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return languageValue;
};

export default UseSkillRandom;
