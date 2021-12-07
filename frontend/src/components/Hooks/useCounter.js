import { useState } from "react";

const useCounter = (value) => {
  const [counter, setCounter] = useState(value);

  const increaseCounter = () => setCounter(counter + 1);
  const decreaseCounter = () => {
    if (counter <= 1) {
      return;
    }
    setCounter(counter - 1);
  };

  return {
    counter,
    increaseCounter,
    decreaseCounter,
  };
};

export default useCounter;
