import React from "react";
import { DialogContainer } from "../lib/MyLayout";

const Page = ({ header, footer, children }) => {
  return (
    <div className="Page">
      <header>{header}</header>
      <main>{children}</main>
      <footer>{footer}</footer>
      <DialogContainer />
    </div>
  );
};

export default Page;
