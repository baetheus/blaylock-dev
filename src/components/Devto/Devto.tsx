import { FunctionalComponent, h } from 'preact';
import { Article } from '~/libraries/devto';

import { Articles } from './Articles';

export interface DevtoProps {
  articles?: Article[];
}

/**
 * @render react
 * @name Devto
 * @example
 * <Devto />
 */
export const Devto: FunctionalComponent<DevtoProps> = ({ articles = [] }) => {
  return (
    <section className="fld-col flg-5">
      <h2>
        dev.to/
        <a
          href="https://dev.to/baetheus"
          target="_blank"
          rel="noopener noreferrer"
        >
          baetheus
        </a>
      </h2>
      <Articles articles={articles} />
    </section>
  );
};
