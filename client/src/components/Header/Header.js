import { useContext } from "react";
import { Context } from "../../ContextStore";
import {
  Navbar,
  NavDropdown,
  Nav,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { BsPerson, BsEnvelope, BsFillPlusCircleFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import "./Header.css";
function Header() {
  const { userData, setUserData } = useContext(Context);
  //Setting up the nav bar and add listing button and profile button.
  return (
    <Navbar collapseOnSelect bg="light">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Tori 5.9.1
        </NavLink>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">{}</Nav>
          {userData ? (
            <Nav>
              <NavLink id="addButton" to="/add-product">
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip>
                      <strong>List item</strong>
                    </Tooltip>
                  }
                >
                  <BsFillPlusCircleFill />
                </OverlayTrigger>
              </NavLink>

              <NavDropdown
                title={
                  <img id="navImg" src={userData.avatar} alt="user-avatar" />
                }
                drop="left"
                id="collasible-nav-dropdown"
              >
                <NavLink //you can open profile or messages or logout when dropdown opened from profilepic
                  className="dropdown-item"
                  to={`/profile/${userData._id}`}
                >
                  <BsPerson />
                  Profile
                </NavLink>

                <NavLink className="dropdown-item" to="/messages">
                  <BsEnvelope />
                  Messages
                </NavLink>
                <NavDropdown.Divider />

                <NavLink
                  className="dropdown-item"
                  to="/auth/logout"
                  onClick={() => {
                    setUserData(null);
                  }}
                >
                  <BiLogOut />
                  Log out
                </NavLink>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              <NavLink id="nav-sign-in" to="/auth/login">
                Sign In
              </NavLink>
              <NavLink //if user not logged in is suggested to sign in
                id="nav-sign-up"
                to="/auth/register"
              >
                Sign Up
              </NavLink>
            </Nav>
          )}
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Header;
