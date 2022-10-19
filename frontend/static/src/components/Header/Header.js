import Nav from "react-bootstrap/Nav";

function Header() {
  return (
    <Nav defaultActiveKey="/home" as="ul" className="navbar">
      <Nav.Item as="li" className="navlink">
        <Nav.Link href="/" className="link">
          Articles
        </Nav.Link>
      </Nav.Item>
      <Nav.Item as="li" className="navlink">
        <Nav.Link eventKey="/profile/" className="link">
          Profile
        </Nav.Link>
      </Nav.Item>
      <Nav.Item as="li" className="navlink">
        <Nav.Link eventKey="/login/" className="link">
          Login
        </Nav.Link>
      </Nav.Item>
      <Nav.Item as="li" className="navlink">
        <Nav.Link eventKey="link-2" className="link">
          Logout
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
export default Header;
