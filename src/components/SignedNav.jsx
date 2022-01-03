import React, { useState } from "react";
import { Nav, NavDropdown, Modal, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

const SignedNav = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(state => state.loggedInUser);
  const navigate = useNavigate();
  const logOut = () => {
    navigate("/");
    dispatch({ type: "LOGOUT" });
  };

  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const winScroll = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ height: "100px" }}>
      <Nav
        className="justify-content-start"
        activeKey="/home"
        style={{
          position: "fixed",
          top: "0",
          height: " 75px",
          zIndex: "9",
          width: "100%",
          backgroundColor: "#ff5f4a",
        }}>
        <div
          style={{
            flex: "2",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}>
          <Nav.Item>
            <Nav.Link as={Link} to="/newsfeed" onClick={winScroll}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <HomeIcon
                  style={{
                    fontSize: "40px",
                    position: "relative",
                    color: "white",
                  }}
                />
                <small style={{ color: "white", fontSize: "12px" }}>Home</small>
              </div>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/writestory" eventKey="link-1">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <BorderColorIcon
                  style={{
                    fontSize: "35px",
                    color: "white",
                  }}
                />
                <small
                  style={{
                    color: "white",
                    marginTop: "6px",
                    fontSize: "12px",
                  }}>
                  Add Story
                </small>
              </div>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/suggested">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <PersonAddAlt1Icon
                  style={{
                    fontSize: "40px",
                    color: "white",
                    marginLeft: "7px",
                  }}
                />
                <small style={{ color: "white", fontSize: "12px" }}>
                  Follow
                </small>
              </div>
            </Nav.Link>
          </Nav.Item>
        </div>
        <div
          className="image-dropdown"
          style={{
            flex: "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}>
          <NavDropdown
            id="basic-nav-dropdown dropdown-toggle"
            className="mt-4"
            title={
              <img
                src={loggedInUser.photo}
                alt=""
                style={{
                  height: "45px",
                  width: "45px",
                  borderRadius: "50%",
                  position: "absolute",
                  right: "10px",
                  top: "-15px",
                }}
              />
            }>
            <NavDropdown.Item
              as={Link}
              to={`/profile/${loggedInUser.username}`}
              style={{
                width: "100vw",
                textAlign: "center",
                color: "#ff5f4a",
              }}
              onClick={winScroll}>
              My Profile
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to={"/settings"}
              style={{
                textAlign: "center",
                color: "#ff5f4a",
              }}>
              Settings
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => setModalShow(true)}
              style={{
                textAlign: "center",
                color: "#ff5f4a",
              }}>
              Sign Out
            </NavDropdown.Item>
            <Modal
              show={modalShow}
              onHide={() => setModalShow(false)}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered>
              <Modal.Header
                style={{ display: "flex", justifyContent: "center" }}
                className="">
                <Modal.Title className="">
                  Are you sure you want to sign out, {loggedInUser.firstname}?
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="d-flex justify-content-evenly">
                <Button
                  onClick={() => setModalShow(false)}
                  style={{
                    border: "1px solid #ff5f4a",
                    borderRadius: "15px",
                    color: "#ff5f4a",
                    textAlign: "center",
                    margin: "5px",
                    backgroundColor: "#fff",
                    width: "100px",
                  }}>
                  No
                </Button>
                <Button
                  onClick={logOut}
                  style={{
                    backgroundColor: "#ff5f4a",
                    color: "white",
                    borderRadius: "15px",
                    textAlign: "center",
                    margin: "5px",
                    borderColor: "white",
                    width: "100px",
                  }}>
                  Yes
                </Button>
              </Modal.Body>
            </Modal>
          </NavDropdown>
        </div>
      </Nav>
    </div>
  );
};

export default SignedNav;
