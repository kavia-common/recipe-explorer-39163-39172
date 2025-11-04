const readJson = (val) => {
  try {
    if (!val) return {};
    return JSON.parse(val);
  } catch {
    return {};
  }
};

// PUBLIC_INTERFACE
export function getApiBase() {
  /** Returns API base URL from env: REACT_APP_API_BASE or REACT_APP_BACKEND_URL. */
  const a = process.env.REACT_APP_API_BASE || '';
  const b = process.env.REACT_APP_BACKEND_URL || '';
  return a || b || '';
}

// PUBLIC_INTERFACE
export function getFeatureFlags() {
  /** Returns feature flags from REACT_APP_FEATURE_FLAGS as JSON. */
  const raw = process.env.REACT_APP_FEATURE_FLAGS;
  return readJson(raw);
}

// PUBLIC_INTERFACE
export function isMockEnabled() {
  /** Returns true if mockData flag is enabled or no API base is provided. */
  const flags = getFeatureFlags();
  const api = getApiBase();
  const explicit = Boolean(flags.mockData);
  return explicit || !api;
}
