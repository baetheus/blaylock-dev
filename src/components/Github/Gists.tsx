import { GistT } from 'libraries/github';
import React from 'react';

export interface GistsProps {
  gists?: GistT;
}

/**
 * @render react
 * @name Gists
 * @example
 * <Gists />
 */
export const Gists: React.FC<GistsProps> = ({ gists = [] }) => {
  return (
    <ul className="fld-column flg-4">
      {gists.length === 0 && <div>No Gistsitories!</div>}
      {gists
        .sort((a: any, b: any) => b.updatedAt - a.updatedAt)
        .map(g => (
          <li className="fld-column flg-3" key={g.name}>
            <div className="font-header fsu-2">
              <a
                href={`https://gist.github.com/baetheus/${g.name}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {g.description.getOrElse('No Description')}
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
