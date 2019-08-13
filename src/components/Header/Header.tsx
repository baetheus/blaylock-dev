import { FunctionalComponent, h } from 'preact';

import { HeaderNav } from './HeaderNav';

export interface HeaderProps {}

/**
 * @render react
 * @name Header
 * @example
 * <Header />
 */
export const Header: FunctionalComponent<HeaderProps> = () => {
  return (
    <header>
      <h1>Brandon Blaylock</h1>
      <HeaderNav />
    </header>
  );
};
