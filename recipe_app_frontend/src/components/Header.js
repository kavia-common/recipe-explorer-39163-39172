import React from 'react';

// PUBLIC_INTERFACE
export default function Header({ query, setQuery, onHome, title }) {
  /** Header with logo and search input. */
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo" role="button" onClick={onHome} aria-label="Go Home">
          <span style={{ fontSize: 20 }}>🍳</span>
          <span>{title}</span>
        </div>
        <div className="search">
          <span className="icon">🔍</span>
          <input
            className="input"
            placeholder="Search recipes, ingredients..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search recipes"
          />
        </div>
        <button className="btn ghost" onClick={onHome} aria-label="All recipes">
          All
        </button>
      </div>
    </header>
  );
}
