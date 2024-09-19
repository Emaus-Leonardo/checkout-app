import React from "react";
import Header from "./Header";  
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="">
      <Header /> 
      <main className="bg-gray-100">{children}</main>
      <Footer/>
    </div>
  );
};

export default Layout;
