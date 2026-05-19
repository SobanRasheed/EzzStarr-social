import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./Loader"; // or any loading spinner component

const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
};

export default Layout;