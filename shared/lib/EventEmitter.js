const createEventEmitter = (value) => {
  let handlers = [];

  const on = (handler) => handlers.push(handler);
  const off = (handler) => handlers.filter((h) => h !== handler);

  const get = () => value;
  const set = (newValue) => {
    value = newValue;
    handlers.forEach((handler) => handler(newValue));
  };

  return { on, off, get, set };
};

export default createEventEmitter;
