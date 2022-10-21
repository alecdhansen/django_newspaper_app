import { useEffect, useState, useCallback } from "react";
import { useNavigate, Routes, Route, json } from "react-router-dom";
import Layout from "../Layout/Layout";
import LoadPage from "../Login/LoadPage";
import ProfileForm from "../Profile/ProfileForm";
import Articles from "../Articles/Articles";
import MyArticles from "../Articles/MyArticles";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [state, setState] = useState(null);

  const newState = JSON.parse(window.sessionStorage.getItem("state"));

  const navigate = useNavigate();

  useEffect(() => {
    setState(newState);
  }, [navigate]);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/dj-rest-auth/user/");
      console.log(response);
      if (!response.ok) {
        setIsAuth(false);
      } else {
        setIsAuth(true);
      }
    };
    checkAuth();
  }, []);

  // console.log({ isAuth });

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout isAuth={isAuth} setIsAuth={setIsAuth} state={state} />
          }
        >
          <Route index element={<Articles />} />
          <Route
            path="loadpage"
            element={<LoadPage setIsAuth={setIsAuth} setState={setState} />}
          />
          <Route path="user/profile" element={<ProfileForm />} />
          <Route path="user/articles" element={<MyArticles state={state} />} />
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
