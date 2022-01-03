import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
const Navigation = () => {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ fontWeight: "700" }}>
            TINY
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                ABOUT
              </Nav.Link>
              <Nav.Link as={Link} to="/">
                CONTACT US
              </Nav.Link>
              <NavDropdown title="HELPFUL LINKS" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1" title="FAQ">
                  FAQ
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2" title="PARTNERSHIPS">
                  PARTNERSHIPS
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3" title="CAREERS">
                  CAREERS
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4" title="PRIVACY">
                  PRIVACY
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link
                as={Link}
                to="/register"
                style={{
                  border: "1px solid #ff5f4a",
                  borderRadius: "15px",
                  color: "#ff5f4a",
                  textAlign: "center",
                  margin: "5px",
                }}
              >
                REGISTER
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/login"
                style={{
                  backgroundColor: "#ff5f4a",
                  color: "white",
                  borderRadius: "15px",
                  textAlign: "center",
                  margin: "5px",
                }}
              >
                SIGN IN
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
