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
import {
  BsFillPersonFill,
  BsFillEnvelopeFill,
  BsFillPlusCircleFill,
} from "react-icons/bs";
import { IoLogOut } from "react-icons/io5";
import "./Header.css";
function Header() {
  const { userData, setUserData } = useContext(Context);
  //Setting up the nav bar and add listing button and profile button.
  return (
    <Navbar collapseOnSelect bg="light">
      <div className="container">
        <Navbar.Brand>
          <NavLink className="navbar-brand" to="/">
            Tori 5.9...
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">{}</Nav>
          {userData ? (
            <Nav>
              <NavLink className="nav-item" id="addButton" to="/add-product">
                <OverlayTrigger
                  key="bottom"
                  placement="bottom"
                  overlay={
                    <Tooltip id={`tooltip-bottom`}>
                      <strong>List a item</strong>
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
                  <BsFillPersonFill />
                  Profile
                </NavLink>

                <NavLink className="dropdown-item" to="/messages">
                  <BsFillEnvelopeFill />
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
                  <IoLogOut />
                  Log out
                </NavLink>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              <NavLink className="nav-item" id="nav-sign-in" to="/auth/login">
                Sign In
              </NavLink>
              <NavLink //if user not logged in is suggested to sign in
                className="nav-item"
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
