import { NavLink, Outlet } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";

export default function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <h1>Darbo skelbimai</h1>
        <nav>
          <NavLink to="/">Pradinis</NavLink>
          <NavLink to="about">Apie</NavLink>
          <NavLink to="help">Pagalba</NavLink>
          <NavLink to="careers">Darbo pasiūlymai</NavLink>
        </nav>
      </header>
      <Breadcrumbs />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
