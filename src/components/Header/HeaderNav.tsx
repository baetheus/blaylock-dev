import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router';

export interface HeaderNavProps {}

/**
 * @render react
 * @name HeaderNav
 * @example
 * <HeaderNav />
 */
export const HeaderNav: FunctionalComponent<HeaderNavProps> = () => {
  return (
    <nav className="fls-1-1">
      <ul className="fld-row flg-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/colophon">Colophon</Link>
        </li>
      </ul>
    </nav>
  );
};
