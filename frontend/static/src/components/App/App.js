import { useEffect, useState, useCallback } from "react";
import { useNavigate, Routes, Route, json } from "react-router-dom";
import Layout from "../Layout/Layout";
import LoadPage from "../Login/LoadPage";
import ProfileForm from "../Profile/ProfileForm";
import Articles from "../Articles/Articles";
import MyArticles from "../Articles/MyArticles/MyArticles";
import AdminArticles from "../Articles/AdminArticles";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [state, setState] = useState(null);
  const [isEditor, setIsEditor] = useState(false);

  const newState = JSON.parse(window.sessionStorage.getItem("state"));

  const navigate = useNavigate();

  useEffect(() => {
    setState(newState);
  }, [navigate]);

  useEffect(() => {
    const checkAuth = async () => {
      debugger;
      const response = await fetch("/dj-rest-auth/user/");
      if (!response.ok) {
        setIsAuth(false);
        setIsEditor(false);
      } else {
        setIsAuth(true);
        if (newState.is_superuser == true) {
          setIsEditor(true);
        }
      }
    };
    checkAuth();
  }, []);

  // **** This useEffect prohibits site from loading initally. Take a look at this ****

  console.log({ isEditor, isAuth });

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              isAuth={isAuth}
              isEditor={isEditor}
              setIsEditor={setIsEditor}
              setIsAuth={setIsAuth}
              state={state}
              newState={newState}
            />
          }
        >
          <Route index element={<Articles />} />
          <Route
            path="loadpage"
            element={
              <LoadPage
                setIsAuth={setIsAuth}
                setState={setState}
                setIsEditor={setIsEditor}
              />
            }
          />
          <Route path="user/profile" element={<ProfileForm />} />
          <Route
            path="admin/articles/submitted"
            element={<AdminArticles state={state} />}
          />
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
