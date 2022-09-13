import * as React from "react";
import Header from "../components/header";
import Footer from "../components/footer";

const LayoutComponent = ({ children }) => {
  return (
    <div className="bg-slate-900 text-slate-300">
      <Header></Header>
      <br />
      {children}
      <br />
      <Footer></Footer>
    </div>
  );
};

export default LayoutComponent;
