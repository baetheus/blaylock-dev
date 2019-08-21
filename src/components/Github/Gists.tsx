import { Component, FunctionalComponent, h } from 'preact';
import { Gist } from '~/libraries/github';

export interface GistsProps {
  gists?: Gist[];
}

/**
 * @render react
 * @name Gists
 * @example
 * <Gists />
 */
export const Gists: FunctionalComponent<GistsProps> = ({ gists = [] }) => {
  return (
    <ul class="fld-col flg-4">
      {gists.length === 0 && <div>No Gistsitories!</div>}
      {gists
        .sort((a: any, b: any) => b.updatedAt - a.updatedAt)
        .map(g => (
          <li class="fld-col" key={g.name}>
            <div class="fs-u1">
              <a
                href={`https://gist.github.com/baetheus/${g.name}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {g.description || 'No Description'}
              </a>
            </div>
            <div class="fs-d2 cf-a1">
              <em>{g.updatedAt.toLocaleString()}</em>
            </div>
            <div>
              <em>
                {g.stargazers.totalCount > 1
                  ? `${g.stargazers.totalCount} stargazers`
                  : g.stargazers.totalCount === 1
                  ? `1 stargazer`
                  : 'No stargazers :('}
              </em>
            </div>
          </li>
        ))}
    </ul>
  );
};
