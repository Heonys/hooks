import React from "react";
import createEventEmitter from "shared/lib/EventEmitter";

const MyReact = (function MyReact() {
  const memorizedStates = [];
  const isInitalized = [];
  const deps = [];
  const cleanups = [];
  let cursor = 0;

  const useState = (initalValue = "") => {
    const { forceUpdate } = useForceUpdata();

    if (!isInitalized[cursor]) {
      memorizedStates[cursor] = initalValue;
      isInitalized[cursor] = true;
    }

    const state = memorizedStates[cursor];

    const setStateAt = (_cursor) => (nextState) => {
      if (state === nextState) return;
      memorizedStates[_cursor] = nextState;
      forceUpdate();
    };

    const setState = setStateAt(cursor);

    cursor += 1;

    return [state, setState];
  };

  function useForceUpdata() {
    const [value, setValue] = React.useState(0);
    const forceUpdate = () => {
      setValue(value + 1);
      cursor = 0;
    };
    return { forceUpdate };
  }

  function useEffect(effect, nextDeps) {
    function runDeferedEffect() {
      function runEffect() {
        const cleanup = effect();
        if (cleanup) cleanups[cursor] = cleanup;
      }
      const ENOUGH_TIME_TO_RENDER = 1;
      setTimeout(runEffect, ENOUGH_TIME_TO_RENDER);
    }

    if (!isInitalized[cursor]) {
      isInitalized[cursor] = true;
      deps[cursor] = nextDeps;
      cursor += 1;
      runDeferedEffect();
      return;
    }
    const prevDeps = deps[cursor];
    const depsSame = prevDeps.every((prevDep, index) => prevDep === nextDeps[index]);
    if (depsSame) {
      cursor += 1;
      return;
    }
    deps[cursor] = nextDeps;
    cursor += 1;
    runDeferedEffect();
  }

  function resetCursor() {
    cursor = 0;
  }

  function cleanupEffects() {
    cleanups.forEach((cleanup) => cleanup());
  }

  function createContext(initalValue) {
    const emitter = createEventEmitter(initalValue);

    const Provider = ({ value, children }) => {
      React.useEffect(() => {
        emitter.set(value);
      }, [value]);

      return <>{children}</>;
    };

    return {
      Provider,
      emitter,
    };
  }

  function useContext(context) {
    const [value, setValue] = React.useState(context.emitter.get());

    React.useEffect(() => {
      context.emitter.on(setValue);
      return () => context.emitter.off(setValue);
    }, [context]);

    return value;
  }

  function useRef(initalValue) {
    if (!isInitalized[cursor]) {
      memorizedStates[cursor] = { current: initalValue };
      isInitalized[cursor] = true;
    }

    const memorizedState = memorizedStates[cursor];
    cursor += 1;
    return memorizedState;
  }

  function createStore(reducer, initalValue) {
    let currentValue = initalValue;
    const lisenter = [];

    const getValue = () => currentValue;
    const describe = (callback) => lisenter.push(callback);
    const dispatch = (action) => {
      const nextValue = reducer(currentValue, action);
      if (nextValue !== currentValue) {
        currentValue = nextValue;
        lisenter.forEach((callback) => callback(nextValue));
      }
    };

    return {
      getValue,
      describe,
      dispatch,
    };
  }

  function useReducer(reducer, initalValue) {
    if (!isInitalized[cursor]) {
      memorizedStates[cursor] = createStore(reducer, initalValue);
      isInitalized[cursor] = true;
    }
    const store = memorizedStates[cursor];
    const { forceUpdate } = useForceUpdata();
    store.describe(forceUpdate);
    cursor += 1;

    return [store.getValue(), store.dispatch];
  }

  function useMemo(nextCreate, deps) {
    if (!isInitalized[cursor]) {
      const nextValue = nextCreate();
      memorizedStates[cursor] = [nextValue, deps];
      isInitalized[cursor] = true;
    }

    const nextDeps = deps;
    const [prevValue, prevDeps] = memorizedStates[cursor];

    if (prevDeps.every((deps, index) => deps === nextDeps[index])) {
      cursor += 1;
      return prevValue;
    }

    const nextValue = nextCreate();
    memorizedStates[cursor] = [nextValue, deps];
    cursor += 1;
    return nextValue;
  }

  function useCallback(callback, deps) {
    return useMemo(() => callback, deps);
  }

  function memo(TargetCompoment) {
    return (nextProps) => {
      if (!TargetCompoment.memoizedState) {
        const nextValue = React.createElement(TargetCompoment, nextProps);
        TargetCompoment.memoizedState = [nextValue, nextProps];
      }

      const [prevValue, prevProps] = TargetCompoment.memoizedState;
      if (Object.keys(nextProps).every((key) => nextProps[key] === prevProps[key])) {
        return prevValue;
      }
      const nextValue = React.createElement(TargetCompoment, nextProps);
      TargetCompoment.memoizedState = [nextValue, nextProps];
      return nextValue;
    };
  }

  return {
    useState,
    useEffect,
    resetCursor,
    cleanupEffects,
    createContext,
    useContext,
    useRef,
    createStore,
    useReducer,
    useMemo,
    useCallback,
    memo,
  };
})();

export default MyReact;
