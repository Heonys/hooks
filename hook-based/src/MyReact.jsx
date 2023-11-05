import React from "react";

const MyReact = (function () {
  const memoizedValue = [];
  const isInitalized = [];
  let cursor = 0;

  function useState(initalValue) {
    if (!isInitalized[cursor]) {
      memoizedValue[cursor] = initalValue;
      isInitalized[cursor] = true;
    }

    const { forceUpdate } = useForceUpdate();

    const prevState = memoizedValue[cursor];
    const setStateAt = (_cursor) => (nextState) => {
      if (nextState === prevState) return;
      memoizedValue[_cursor] = nextState;
      forceUpdate();
    };
    const setState = setStateAt(cursor);

    cursor += 1;
    return [prevState, setState];
  }

  const useForceUpdate = () => {
    const [value, setValue] = React.useState(0);
    const forceUpdate = () => {
      cursor = 0;
      setValue(value + 1);
    };
    return { forceUpdate };
  };

  return {
    useState,
  };
})();

export default MyReact;
