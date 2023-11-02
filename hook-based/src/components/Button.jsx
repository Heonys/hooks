import React from "react";
import classNames from "classnames";

const Button = ({ styleType, block, ...rest }) => {
  const className = classNames("Button", styleType, {
    block,
  });

  return <button className={className} {...rest} />;
};

export default Button;
