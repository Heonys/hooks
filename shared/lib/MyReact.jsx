import React from "react";
import createEventEmitter from "shared/lib/EventEmitter";

const MyReact = (() => {
  function createContext(initalValue) {
    const emitter = createEventEmitter(initalValue);

    class Provider extends React.Component {
      componentDidMount() {
        emitter.set(this.props.value);
      }
      componentDidUpdate() {
        emitter.set(this.props.value);
      }
      render() {
        return <>{this.props.children}</>;
      }
    }

    class Consumer extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          value: emitter.get(),
        };
        this.setValue = this.setValue.bind(this);
      }

      setValue(newValue) {
        this.setState({ value: newValue });
      }

      componentDidMount() {
        emitter.on(this.setValue);
      }
      componentWillUnmount() {
        emitter.off(this.setValue);
      }

      render() {
        return <>{this.props.children(this.state.value)}</>;
      }
    }

    return {
      Provider,
      Consumer,
    };
  }

  return { createContext };
})();

export default MyReact;
