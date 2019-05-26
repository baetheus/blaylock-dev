import './HeaderNav.css';

import React from 'react';
import { Link } from 'react-router-dom';

export interface HeaderNavProps {}

/**
 * @render react
 * @name HeaderNav
 * @example
 * <HeaderNav />
 */
export const HeaderNav: React.FC<HeaderNavProps> = () => {
  return (
    <nav className="fls-1-1">
      <ul className="fld-row flg-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about/">About</Link>
        </li>
      </ul>
    </nav>
  );
};
