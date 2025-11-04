Environment variables used by Recipe Explorer (React):

- REACT_APP_API_BASE: Base URL for API, e.g. https://api.example.com
- REACT_APP_BACKEND_URL: Alternative base URL if API_BASE is not set
- REACT_APP_FEATURE_FLAGS: JSON string for feature flags, e.g. {"mockData":true}

Behavior:
- API base is resolved as REACT_APP_API_BASE or REACT_APP_BACKEND_URL.
- If none provided or REACT_APP_FEATURE_FLAGS.mockData is true, the app uses an in-memory mock for recipes so the preview is functional.
