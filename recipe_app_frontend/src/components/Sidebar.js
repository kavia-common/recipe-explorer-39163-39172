import React from 'react';

// PUBLIC_INTERFACE
export default function Sidebar({
  categories,
  activeCategory,
  onSelectCategory,
  onShowFavorites,
  onShowAll,
  favoritesCount
}) {
  /** Sidebar with categories and favorites shortcut. */
  return (
    <aside className="sidebar surface shadow-sm">
      <div>
        <div className="section-title">Quick Actions</div>
        <div className="quick-actions">
          <button className="btn" onClick={onShowAll}>All Recipes</button>
          <button className="btn" onClick={onShowFavorites}>
            Favorites <span className="badge">{favoritesCount}</span>
          </button>
        </div>
      </div>
      <div>
        <div className="section-title">Categories</div>
        <div className="category-list">
          {categories.map((c) => (
            <div
              key={c}
              className={`category-item ${activeCategory === c ? 'active' : ''}`}
              onClick={() => onSelectCategory(c)}
              role="button"
              aria-label={`Filter by category ${c}`}
            >
              <span>{c}</span>
              {activeCategory === c ? <span>•</span> : <span style={{ color: '#9CA3AF' }}>›</span>}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
