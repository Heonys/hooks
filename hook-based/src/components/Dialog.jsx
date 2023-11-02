import React, { createRef } from "react";

class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.footerRef = createRef();
  }

  componentDidMount() {
    if (!this.footerRef.current) return;
    const target = Array.from(this.footerRef.current.querySelectorAll("button"));
    if (target.length === 0) return;
    const activeButton = target[target.length - 1];
    activeButton.focus();
  }

  render() {
    const { header, children, footer } = this.props;
    return (
      <div className="Dialog">
        {header && <header>{header}</header>}
        <main>{children}</main>
        {footer && <footer ref={this.footerRef}>{footer}</footer>}
      </div>
    );
  }
}

export default Dialog;
