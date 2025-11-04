import React from 'react';

// PUBLIC_INTERFACE
export default function Footer() {
  /** Application footer. */
  return (
    <footer className="footer">
      <div>© {new Date().getFullYear()} Recipe Explorer • Ocean Professional</div>
    </footer>
  );
}
