import React from 'react';

// PUBLIC_INTERFACE
export default function RecipeDetail({ recipe, isFavorite, onBack, onToggleFavorite }) {
  /** Detailed page for a recipe. */
  return (
    <div className="detail">
      <div className="detail-hero">
        <img src={recipe.image} alt={recipe.title} />
        <div className="card">
          <h2 style={{ marginTop: 0 }}>{recipe.title}</h2>
          <div className="recipe-meta" style={{ marginBottom: 8 }}>
            <span className="badge">{recipe.time || '30m'}</span>
            <span>•</span>
            <span>{(recipe.categories || []).join(', ')}</span>
          </div>
          <p style={{ color: 'var(--muted)' }}>{recipe.description}</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn" onClick={onBack}>← Back</button>
            <button className={`btn ${isFavorite ? 'secondary' : ''}`} onClick={onToggleFavorite}>
              {isFavorite ? '★ Unfavorite' : '☆ Favorite'}
            </button>
          </div>
        </div>
      </div>
      <div className="detail-body">
        <div className="card">
          <h3>Ingredients</h3>
          <ul>
            {(recipe.ingredients || []).map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3>Instructions</h3>
          <ol>
            {(recipe.instructions || []).map((s, idx) => (
              <li key={idx} style={{ marginBottom: 8 }}>{s}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
