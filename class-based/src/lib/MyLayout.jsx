import React, { createContext } from "react";
import Dialog from "../components/Dialog";
import BackDrop from "../components/BackDrop";
import { createPortal } from "react-dom";

export const LayoutContext = createContext({});
LayoutContext.displayName = "LayoutContext";

export class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog: null,
    };
    this.setDialog = this.setDialog.bind(this);
  }
  setDialog(dialog) {
    this.setState({ dialog });
  }

  render() {
    const value = {
      dialog: this.state.dialog,
      setDialog: this.setDialog,
    };
    return <LayoutContext.Provider value={value}>{this.props.children}</LayoutContext.Provider>;
  }
}

export const withLayout = (WrappedCompoennt) => {
  const WithLayout = (props) => {
    return (
      <LayoutContext.Consumer>
        {({ dialog, setDialog }) => {
          const openDialog = setDialog;
          const closeDialog = () => setDialog(null);
          const startLoading = (message) => setDialog(<Dialog>{message}</Dialog>);
          const finishLoading = closeDialog;

          const enhandcedProps = { dialog, openDialog, closeDialog, startLoading, finishLoading };

          return <WrappedCompoennt {...props} {...enhandcedProps} />;
        }}
      </LayoutContext.Consumer>
    );
  };

  return WithLayout;
};

export const DialogContainer = withLayout(({ dialog }) => {
  return dialog && createPortal(<BackDrop>{dialog}</BackDrop>, document.querySelector("#dialog"));
});
