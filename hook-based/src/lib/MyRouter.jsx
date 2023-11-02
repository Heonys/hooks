import React, { Children, useContext, useEffect, useState } from "react";

const routerContext = React.createContext();
routerContext.displayName = "RouterContext";

export const Router = ({ children }) => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    window.addEventListener("popstate", handlePopState);
    window.history.replaceState({ path }, "");
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  function changePath(path) {
    setPath(path);
    window.history.pushState({ path }, "", path);
  }

  function handlePopState(event) {
    const nextPath = event.state && event.state.path;
    if (!nextPath) return;
    setPath(nextPath);
  }

  return <routerContext.Provider value={{ path, changePath }}>{children}</routerContext.Provider>;
};

export const Routes = ({ children }) => {
  const { path } = useContext(routerContext);

  let selected = null;
  Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    if (child.type === React.Fragment) return;
    if (!child.props.to || !child.props.element) return;
    const { to, element } = child.props;
    if (to !== path.replace(/\?.*$/, "")) return;
    selected = element;
  });
  return selected;
};

export const Route = () => null;

export const Link = ({ to, ...rest }) => {
  const { path, changePath } = useContext(routerContext);

  const handleClick = (event) => {
    event.preventDefault();
    if (to !== path) changePath(to);
  };

  return <a href={to} onClick={handleClick} {...rest} />;
};

export const useNaivigate = () => {
  const { path, changePath } = useContext(routerContext);

  const navigate = (nextPath) => {
    if (path !== nextPath) changePath(nextPath);
  };
  return navigate;
};

export const useMatch = () => {
  const { path } = useContext(routerContext);
  const match = (comparedPath) => path === comparedPath;
  return match;
};

export const useParams = () => {
  // TODO:
  const params = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const paramsObject = {};
    for (const [key, value] of searchParams) {
      paramsObject[key] = value;
    }
    return paramsObject;
  };

  return params();
};
