import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "25px", background: "#222" }}>
      <NavLink to="/" style={{ margin: "10px", color: "#fff" }}>
        Home
      </NavLink>
      <NavLink to="/Membership" style={{ margin: "10px", color: "#fff" }}>
        Membership
      </NavLink>
      <NavLink to="/Manga" style={{ margin: "10px", color: "#fff" }}>
        Manga
      </NavLink>
      <NavLink to="/Threads" style={{ margin: "10px", color: "#fff" }}>
        Threads
      </NavLink>
      <NavLink to="/Stories" style={{ margin: "10px", color: "#fff" }}>
        Stories
      </NavLink>
      <NavLink to="/Events" style={{ margin: "10px", color: "#fff" }}>
        Events
      </NavLink>
    </nav>
  );
};

export default Navbar;
