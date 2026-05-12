import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    navigate(`/search?query=${encodeURIComponent(query.trim())}`);
  }

  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm">
        <div className="container-fluid px-4">
          <NavLink className="navbar-brand fw-bold text-primary" to="/">🐻‍❄️ Білий ведмідь</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-1">
              <li className="nav-item"><NavLink className="nav-link" to="/">Головна</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/morphology">Зовнішній вигляд</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/nutrition">Харчування</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/population">Ареал</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/photo">Фотографії</NavLink></li>
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
              <input className="form-control me-2" value={query} onChange={(e) => setQuery(e.target.value)} type="search" placeholder="Пошук по сайту" />
              <button className="btn btn-primary" type="submit">Знайти</button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}
