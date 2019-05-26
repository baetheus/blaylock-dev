import React from 'react';

import { HeaderNav } from './HeaderNav';

export interface HeaderProps {}

/**
 * @render react
 * @name Header
 * @example
 * <Header />
 */
export const Header: React.FC<HeaderProps> = () => {
  return (
    <header>
      <h1 className="font-header">Brandon Blaylock</h1>
      <HeaderNav />
    </header>
  );
};
