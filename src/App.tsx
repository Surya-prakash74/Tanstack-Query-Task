import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import ProductsPage from "./pages/ProductsPage";
import UserDetailsPage from "./pages/UserDetailsPage";

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">TQ</div>
          <div>
            <strong>TanStack Explorer</strong>
            <span>React + TypeScript</span>
          </div>
        </div>

        <nav className="nav">
          <NavLink
            to="/users"
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Users
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Products
          </NavLink>
        </nav>
      </header>

      <main className="main-container">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:userId" element={<UserDetailsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </main>

      <footer className="footer">
        <span>TanStack Query Tasks</span>
        <span>React + TypeScript</span>
      </footer>
    </div>
  );
}

export default App;