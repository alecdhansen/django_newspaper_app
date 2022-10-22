import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ScrollToTop from "react-scroll-to-top";

function Layout({ isAuth, setIsAuth, state, newState }) {
  return (
    <>
      <Header
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        state={state}
        newState={newState}
      />
      <Outlet />
      <ScrollToTop
        color="#fff"
        style={{ bottom: 80, right: 50, backgroundColor: "rgb(229, 70, 70)" }}
      />
      {/* <Footer /> */}
    </>
  );
}

export default Layout;
