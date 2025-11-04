import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './theme.css';
import './layout.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import Footer from './components/Footer';
import { getApiBase, isMockEnabled } from './services/config';
import { RecipeService } from './services/recipeService';
import { FavoritesService } from './services/favoritesService';

/**
 * Root application component: sets up layout, theme, routing-lite, and data fetching.
 * Ocean Professional theme is applied via CSS variables in theme.css.
 */
function App() {
  const [recipes, setRecipes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [favorites, setFavorites] = useState(FavoritesService.load());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const apiBase = getApiBase();
  const mock = isMockEnabled();

  const recipeService = useMemo(() => new RecipeService(apiBase, { mock }), [apiBase, mock]);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    recipeService
      .list()
      .then((data) => {
        if (!alive) return;
        setRecipes(data);
        setFiltered(data);
        const cats = Array.from(new Set(data.flatMap((r) => r.categories || []))).sort();
        setCategories(['All', ...cats]);
        setError('');
      })
      .catch((e) => {
        if (!alive) return;
        setError('Failed to load recipes');
        console.error(e);
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [recipeService]);

  // Filter logic driven by search query and category
  useEffect(() => {
    const q = query.trim().toLowerCase();
    const next = recipes.filter((r) => {
      const inCategory = activeCategory === 'All' || (r.categories || []).includes(activeCategory);
      const inQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        (r.ingredients || []).join(' ').toLowerCase().includes(q);
      return inCategory && inQuery;
    });
    setFiltered(next);
  }, [recipes, query, activeCategory]);

  // Persist favorites on change
  useEffect(() => {
    FavoritesService.save(favorites);
  }, [favorites]);

  const selectedRecipe = useMemo(
    () => recipes.find((r) => String(r.id) === String(selectedId)) || null,
    [recipes, selectedId]
  );

  const onToggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const onSelectCategory = (cat) => {
    setActiveCategory(cat);
    setSelectedId(null);
  };

  const onSelectFavoriteFilter = () => {
    setActiveCategory('Favorites');
    setSelectedId(null);
    const favIds = favorites;
    const next = recipes.filter((r) => favIds.has(r.id));
    setFiltered(next);
  };

  const onShowAll = () => {
    setActiveCategory('All');
    setSelectedId(null);
    setFiltered(recipes);
  };

  // Simple client-side "routing": selectedId controls detail view
  const showDetail = Boolean(selectedRecipe);

  return (
    <div className="ocean-app">
      <Header
        query={query}
        setQuery={setQuery}
        onHome={onShowAll}
        title="Recipe Explorer"
      />
      <div className="content">
        <Sidebar
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={onSelectCategory}
          onShowFavorites={onSelectFavoriteFilter}
          onShowAll={onShowAll}
          favoritesCount={favorites.size}
        />
        <main className="main">
          {loading && <div className="card surface shadow-sm">Loading recipes…</div>}
          {error && !loading && <div className="card surface error">Error: {error}</div>}
          {!loading && !error && !showDetail && (
            <RecipeList
              recipes={activeCategory === 'Favorites' ? filtered : filtered}
              favorites={favorites}
              onToggleFavorite={onToggleFavorite}
              onOpen={(id) => setSelectedId(id)}
            />
          )}
          {!loading && !error && showDetail && selectedRecipe && (
            <RecipeDetail
              recipe={selectedRecipe}
              isFavorite={favorites.has(selectedRecipe.id)}
              onBack={() => setSelectedId(null)}
              onToggleFavorite={() => onToggleFavorite(selectedRecipe.id)}
            />
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
