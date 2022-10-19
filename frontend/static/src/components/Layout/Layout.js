import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Layout({ isAuth, setIsAuth, user }) {
  return (
    <>
      <Header isAuth={isAuth} setIsAuth={setIsAuth} user={user} />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
