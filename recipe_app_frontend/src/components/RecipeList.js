import React from 'react';

// PUBLIC_INTERFACE
export default function RecipeList({ recipes, favorites, onToggleFavorite, onOpen }) {
  /** Grid of recipe cards. */
  if (!recipes.length) {
    return <div className="card surface">No recipes found. Try adjusting your filters.</div>;
  }

  return (
    <div className="grid">
      {recipes.map((r) => (
        <article key={r.id} className="card recipe-card">
          <img className="recipe-thumb" src={r.image} alt={r.title} />
          <div className="recipe-title">{r.title}</div>
          <div className="recipe-meta">
            <span className="badge">{r.time || '30m'}</span>
            <span>•</span>
            <span>{(r.categories || []).join(', ') || 'Uncategorized'}</span>
          </div>
          <div className="card-actions">
            <button className="btn" onClick={() => onOpen(r.id)}>View</button>
            <button
              className={`btn ${favorites.has(r.id) ? 'secondary' : ''}`}
              onClick={() => onToggleFavorite(r.id)}
              aria-label="Toggle favorite"
              title="Toggle favorite"
            >
              {favorites.has(r.id) ? '★ Favorited' : '☆ Favorite'}
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
