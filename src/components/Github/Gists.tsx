import { FunctionalComponent, h } from 'preact';
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
    <ul className="fld-col flg-4">
      {gists.length === 0 && <div>No Gistsitories!</div>}
      {gists
        .sort((a: any, b: any) => b.updatedAt - a.updatedAt)
        .map(g => (
          <li className="fld-col flg-3" key={g.name}>
            <div className="fsu-2">
              <a
                href={`https://gist.github.com/baetheus/${g.name}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {g.description || 'No Description'}
              </a>
            </div>
            <div className="fsd-1">
              <em>{g.updatedAt.toLocaleString()}</em>
            </div>
          </li>
        ))}
    </ul>
  );
};
