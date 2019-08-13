import { FunctionalComponent, h } from 'preact';
import { Repository } from '~/libraries/github';

export interface ReposProps {
  repos?: Repository[];
}

/**
 * @render react
 * @name Repos
 * @example
 * <Repos />
 */
export const Repos: FunctionalComponent<ReposProps> = ({ repos = [] }) => {
  return (
    <ul className="fld-col flg-4">
      {repos.length === 0 && <div>No Repositories!</div>}
      {repos
        .sort((a: any, b: any) => b.updatedAt - a.updatedAt)
        .map(r => (
          <li className="fld-col flg-3" key={r.nameWithOwner}>
            <div className="fsu-2">
              <a href={r.url} target="_blank" rel="noopener noreferrer">
                {r.nameWithOwner}
              </a>
            </div>
            <div className="fsd-1">
              <em>{r.updatedAt.toLocaleString()}</em>
            </div>
            <div>
              <em>{r.description || 'No Description'}</em>
            </div>
          </li>
        ))}
    </ul>
  );
};
