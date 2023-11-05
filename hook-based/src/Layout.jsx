import React, { createContext, useContext, useState } from "react";
import ReactDOM from "react-dom";

const layoutContext = createContext();
layoutContext.displayName = "LayoutContext";

export const Layout = ({ children }) => {
  const [dialog, setDialog] = useState(null);
  return <layoutContext.Provider value={{ dialog, setDialog }}>{children}</layoutContext.Provider>;
};

export const useDialog = () => {
  const { dialog, setDialog } = useContext(layoutContext);
  const openDialog = setDialog;
  const closeDialog = () => setDialog(null);
  return { dialog, openDialog, closeDialog };
};

export const DialogContainer = () => {
  const { dialog } = useDialog();
  const dom = document.querySelector("#dialog");
  return dialog && ReactDOM.createPortal(<section>{dialog}</section>, dom);
};
