import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

const Layout = () => {
  return (
    <>
    <ScrollToTop/>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
