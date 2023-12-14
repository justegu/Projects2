import { NavLink, Outlet } from "react-router-dom";

export default function HelpLayout() {
  return (
    <div className="help-layout">
      <h2>Pagalba</h2>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum, vel.
      </p>

      <nav>
        <NavLink to="faq">Dažnai užduodami klausimai</NavLink>
        <NavLink to="contact">Susisiekite su mumis</NavLink>
      </nav>

      <Outlet />
    </div>
  );
}
