import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Spinner from "react-bootstrap/Spinner";

function App(props) {
  const [isAuth, setIsAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/dj-rest-auth/user/");
      if (!response.ok) {
        setIsAuth(false);
        navigate("/login/");
      } else {
        setIsAuth(true);
        navigate("/articles/");
      }
    };
    checkAuth();
  }, [navigate]);

  if (isAuth === null) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
export default App;
