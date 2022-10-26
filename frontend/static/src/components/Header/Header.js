import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";

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
                  <Link to={"/user/profile/"} className="welcomeusername">
                    {state?.username}
                  </Link>
                  !
                </button>
              </div>
              <div className="avatarimgdiv">
                <img className="avatarimg" src={state?.avatar} alt="" />
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
                <Link to={"/"} className="link">
                  Home
                </Link>
              </Nav.Item>
            ) : (
              ""
            )}
            {isAuth && !isEditor ? (
              <Nav.Item className="navlink">
                <Link to={"/user/articles/"} className="link">
                  My Articles
                </Link>
              </Nav.Item>
            ) : (
              ""
            )}
            {isAuth && isEditor ? (
              <Nav.Item className="navlink">
                <Link to={"/adminhub/"} className="link">
                  Admin Hub
                </Link>
              </Nav.Item>
            ) : (
              ""
            )}
            {isAuth ? (
              <Nav.Item className="navlink">
                <Link to={"/user/profile/"} className="link">
                  Profile
                </Link>
              </Nav.Item>
            ) : (
              ""
            )}
            {!isAuth ? (
              <Nav.Item className="navlink">
                <Link to={"/loadpage"} className="link">
                  Login
                </Link>
              </Nav.Item>
            ) : (
              <Button className="navlink" onClick={() => logout()}>
                <a className="link">Logout</a>
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
