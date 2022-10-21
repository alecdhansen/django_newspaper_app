import { useEffect, useState, useCallback } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import LoadPage from "../Login/LoadPage";
import ProfileForm from "../Profile/ProfileForm";
import Articles from "../Articles/Articles";
import MyArticles from "../Articles/MyArticles";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({ username: "", password: "" });
  const [state, setState] = useState({ superUser: false, authorID: 0 });

  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/dj-rest-auth/user/");
      console.log(response);
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

  console.log({ isAuth, user });

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
              <LoadPage
                setIsAuth={setIsAuth}
                user={user}
                setUser={setUser}
                setState={setState}
              />
            }
          />
          <Route path="profile" element={<ProfileForm />} />
          <Route path="myarticles" element={<MyArticles user={user} />} />
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
