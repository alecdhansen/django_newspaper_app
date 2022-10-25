import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";

function Header({ isAuth, setIsAuth, state, newState, isEditor, setIsEditor }) {
  const navigate = useNavigate();
  const handleError = (err) => {
    console.warn(err);
  };

  const logout = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(state),
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
      sessionStorage.clear();
      await setIsAuth(false);
      await setIsEditor(false);
      navigate("/");
    }
  };

  return (
    <>
      <header className="mainheader row">
        {isAuth ? (
          <div
            style={{ display: "flex", alignItems: "center" }}
            className="col-4 col-md-5 left-h"
          >
            <div style={{ display: "flex" }}>
              <div className="usernameavatar">
                Welcome,{" "}
                <button className="welcomeusernamebtn">
                  <a href="/user/profile/" className="welcomeusername">
                    {state?.username}
                  </a>
                  !
                </button>
              </div>
              <div className="avatarimgdiv">
                <img className="avatarimg" src={state?.avatar} />
              </div>
            </div>
          </div>
        ) : (
          <div className="col-4 col-md-5 left-h"></div>
        )}
        {/* <di
          className="col-4 col-md-5 left-h"
        ></div> */}

        <div className="col-4 col-md-2 center-h"></div>
        <Navbar
          expand="lg"
          defaultActiveKey="/home"
          className="navbar col-4 col-md-5"
        >
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
          // style={{ display: "flex", justifyContent: "flex-end" }}
          >
            {isAuth ? (
              <Nav.Item className="navlink">
                <Nav.Link href="/" className="link">
                  Home
                </Nav.Link>
              </Nav.Item>
            ) : (
              ""
            )}
            {isAuth && !isEditor ? (
              <Nav.Item className="navlink">
                <Nav.Link href="/user/articles/" className="link">
                  My Articles
                </Nav.Link>
              </Nav.Item>
            ) : (
              ""
            )}
            {isAuth && isEditor ? (
              <Nav.Item className="navlink">
                <Nav.Link href="/admin/articles/submitted/" className="link">
                  Admin Hub
                </Nav.Link>
              </Nav.Item>
            ) : (
              ""
            )}
            {isAuth ? (
              <Nav.Item className="navlink">
                <Nav.Link href="/user/profile/" className="link">
                  Profile
                </Nav.Link>
              </Nav.Item>
            ) : (
              ""
            )}
            {!isAuth ? (
              <Nav.Item className="navlink">
                <Nav.Link href="/loadpage/" className="link">
                  Login
                </Nav.Link>
              </Nav.Item>
            ) : (
              <Button className="navlink" onClick={() => logout()}>
                <div className="link">Logout</div>
              </Button>
            )}
          </Navbar.Collapse>
        </Navbar>
      </header>
      <h2 className="col-12 titlelogo">Ch</h2>
      <h3 className="titlesublogo">ChattnNews</h3>
    </>
  );
}
export default Header;
