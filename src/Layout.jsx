import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./Loader"; // or any loading spinner component

const Layout = () => {
  const { pathname } = useLocation();
  const isFigmaEventDetail = /^\/events\/[^/]+\/(overview|prizes|participants)$/.test(pathname);
  return (
    <>
      <ScrollToTop />
      {!isFigmaEventDetail && <Navbar />}
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      {!isFigmaEventDetail && <Footer />}
    </>
  );
};

export default Layout;
