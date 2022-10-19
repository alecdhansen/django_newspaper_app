import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Header({ isAuth, setIsAuth, user }) {
  const navigate = useNavigate();
  const handleError = (err) => {
    console.warn(err);
  };

  const logout = async (e) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(user),
    };
    const response = await fetch("/dj-rest-auth/logout/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Oops! Something went wrong");
    } else {
      const data = await response.json();
      Cookies.remove("Authorization", `Token${" "}${data.key}`);
      document.cookie =
        "sessionid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      await setIsAuth(false);
      navigate("/");
    }
  };

  return (
    <Nav defaultActiveKey="/home" as="ul" className="navbar">
      <Nav.Item as="li" className="navlink">
        <Nav.Link href="/articles/" className="link">
          Articles
        </Nav.Link>
      </Nav.Item>
      {isAuth ? (
        <Nav.Item as="li" className="navlink">
          <Nav.Link href="/profile/" className="link">
            Profile
          </Nav.Link>
        </Nav.Item>
      ) : (
        ""
      )}
      {!isAuth ? (
        <Nav.Item as="li" className="navlink">
          <Nav.Link href="/loadpage/" className="link">
            Login
          </Nav.Link>
        </Nav.Item>
      ) : (
        <Button as="li" className="navlink" onClick={() => logout()}>
          <div className="link">Logout</div>
        </Button>
      )}
    </Nav>
  );
}
export default Header;
