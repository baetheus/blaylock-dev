import { RepositoryT } from 'libraries/github';
import React from 'react';

export interface ReposProps {
  repos?: RepositoryT;
}

/**
 * @render react
 * @name Repos
 * @example
 * <Repos />
 */
export const Repos: React.FC<ReposProps> = ({ repos = [] }) => {
  return (
    <ul className="fld-column flg-4">
      {repos.length === 0 && <div>No Repositories!</div>}
      {repos
        .sort((a: any, b: any) => b.updatedAt - a.updatedAt)
        .map(r => (
          <li className="fld-column flg-3" key={r.nameWithOwner}>
            <div className="font-header fsu-2">
              <a href={r.url} target="_blank" rel="noopener noreferrer">
                {r.nameWithOwner}
              </a>
            </div>
            <div className="fsd-1">
              <em>{r.updatedAt.toLocaleString()}</em>
            </div>
            <div>
              <em>{r.description.getOrElse('No Description')}</em>
            </div>
          </li>
        ))}
    </ul>
  );
};
