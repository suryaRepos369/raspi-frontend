import React from "react";
import HeaderNew from "./../headerNew";
import Footer from "./../Footer";
const Layout = (props) => {
  return (
    <>
      <HeaderNew></HeaderNew>
      {props.children}
      <Footer></Footer>
    </>
  );
};
export default Layout;
