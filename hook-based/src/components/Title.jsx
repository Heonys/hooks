import React from "react";
import { Link } from "../lib/MyRouter";

const Title = ({ backUrl, children }) => {
  if (backUrl) {
    return (
      <>
        <Link to={backUrl} />
        <h1 style={{ paddingRight: "44px" }}>{children}</h1>
      </>
    );
  }

  return <h1>{children}</h1>;
};

export default Title;
