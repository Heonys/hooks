import React from "react";
import { Link, withRouter } from "../lib/MyRouter";

const Navbar = ({ match }) => {
  return (
    <nav className="Navbar">
      <Link className={match("/") ? "active" : ""} to="/">
        메뉴목록
      </Link>
      <Link className={match("/order") ? "active" : ""} to="/order">
        주문내역
      </Link>
    </nav>
  );
};

export default withRouter(Navbar);
