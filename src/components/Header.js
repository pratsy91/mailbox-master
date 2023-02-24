import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate, useRouteLoaderData } from "react-router-dom";
const Header = () => {
  const token = useRouteLoaderData("token");
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/auth?mode=login");
  };
  return (
    <Navbar className="justify-content-center" variant="dark" bg="dark">
      <Navbar.Brand className="ms-5">My Mail</Navbar.Brand>
      {token && (
        <Nav className="ms-auto  ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "me-3 text-decoration-none text-warning"
                : "me-3 text-decoration-none text-white"
            }
            end
          >
            Home
          </NavLink>

          <NavLink
            to="/email"
            className={({ isActive }) =>
              isActive
                ? "me-3 text-decoration-none text-warning"
                : "me-3 text-decoration-none text-white"
            }
          >
            inbox
          </NavLink>
          {!token && (
            <NavLink
              to="/auth?mode=login"
              className={({ isActive }) =>
                isActive
                  ? "mx-auto  text-decoration-none text-warning"
                  : "mx-auto  text-decoration-none text-white"
              }
            >
              Login
            </NavLink>
          )}
        </Nav>
      )}

      {token && (
        <Button
          variant="danger"
          className="ms-auto me-5"
          onClick={logoutHandler}
        >
          Logout
        </Button>
      )}
    </Navbar>
  );
};

export default Header;
