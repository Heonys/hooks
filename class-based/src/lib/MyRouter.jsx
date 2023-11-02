import React, { createContext, Children } from "react";

export const RouterContext = createContext({});
RouterContext.displayName = "RouterContext";

export const Link = ({ to, ...rest }) => (
  <RouterContext.Consumer>
    {({ path, changePath }) => {
      const handleClick = (event) => {
        event.preventDefault();
        if (to !== path) changePath(to);
      };

      return <a href={to} onClick={handleClick} {...rest} />;
    }}
  </RouterContext.Consumer>
);

export class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: window.location.pathname,
    };
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handlePopState = this.handlePopState.bind(this);
  }

  componentDidMount() {
    window.addEventListener("popstate", this.handlePopState);
    window.history.replaceState({ path: this.state.path }, "");
  }

  componentWillUnmount() {
    window.removeEventListener("popstate", this.handlePopState);
  }

  handleValueChange(path) {
    this.setState({ path });
    window.history.pushState({ path }, "", path);
  }

  handlePopState(event) {
    const nextPath = event.state && event.state.path;
    if (!nextPath) return;
    this.setState({ path: nextPath });
  }

  render() {
    const contextValue = {
      path: this.state.path,
      changePath: this.handleValueChange,
    };

    return (
      <RouterContext.Provider value={contextValue}>{this.props.children}</RouterContext.Provider>
    );
  }
}

export const Routes = ({ children }) => {
  return (
    <RouterContext.Consumer>
      {({ path }) => {
        let selected = null;
        Children.forEach(children, (child) => {
          if (!React.isValidElement(child)) return;
          if (child.type === React.Fragment) return;
          if (!child.props.to || !child.props.element) return;
          const { to, element } = child.props;
          if (to === path.replace(/\?.*$/, "")) selected = element;
        });
        return selected;
      }}
    </RouterContext.Consumer>
  );
};

export const Route = () => null;

export const withRouter = (WrappedComponent) => {
  const WithRouter = (props) => (
    <RouterContext.Consumer>
      {({ path, changePath }) => {
        const navigate = (nextPath) => {
          if (path !== nextPath) changePath(nextPath);
        };
        const match = (comparedPath) => path === comparedPath;

        const params = () => {
          const searchParams = new URLSearchParams(window.location.search);
          const paramsObject = {};
          for (const [key, value] of searchParams) {
            paramsObject[key] = value;
          }
          return paramsObject;
        };

        const enhancedProps = { navigate, match, params };
        return <WrappedComponent {...props} {...enhancedProps} />;
      }}
    </RouterContext.Consumer>
  );

  return WithRouter;
};
