import { useEffect, useState, useCallback } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import LoadPage from "../Login/LoadPage";
import ProfileForm from "../Profile/ProfileForm";
import Articles from "../Articles/Articles";
import Spinner from "react-bootstrap/Spinner";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({ username: "", password: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/dj-rest-auth/user/");
      if (!response.ok) {
        setIsAuth(false);
        // navigate("/loadpage/");
      } else {
        // debugger;
        setIsAuth(true);
        // navigate("/articles/");
      }
    };
    checkAuth();
  }, [navigate]);

  console.log({ isAuth });

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Layout isAuth={isAuth} setIsAuth={setIsAuth} user={user} />}
        >
          <Route index element={<Articles />} />
          <Route
            path="loadpage"
            element={
              <LoadPage setIsAuth={setIsAuth} user={user} setUser={setUser} />
            }
          />
          <Route path="profile" element={<ProfileForm />} />
        </Route>
        <Route
          path="*"
          element={
            <main>
              <p>there is nothing here! try again! lol!</p>
            </main>
          }
        />
      </Routes>
    </>
  );
}
export default App;
