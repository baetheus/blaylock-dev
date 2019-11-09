import { FunctionalComponent, h } from 'preact';
import { List, ListHeader } from '~/components/List';
import { Repository } from '~/store/github';

export interface ReposProps {
  repos?: Repository[];
  showCount?: number;
}

/**
 * @render react
 * @name Repos
 * @example
 * <Repos />
 */
export const Repos: FunctionalComponent<ReposProps> = ({
  repos = [],
  showCount = 5,
}) => {
  return (
    <List
      title={
        <ListHeader
          prefix="repos"
          link="https://github.com/baetheus"
          text="baetheus"
        ></ListHeader>
      }
    >
      {repos.length === 0 && <div>No Repositories!</div>}
      {repos
        .sort((a: any, b: any) => b.updatedAt - a.updatedAt)
        .slice(0, showCount)
        .map(r => (
          <li class="fld-col" key={r.nameWithOwner}>
            <div class="fs-u1">
              <a href={r.url} target="_blank" rel="noopener noreferrer">
                {r.nameWithOwner}
              </a>
            </div>
            <div class="fs-d2 cf-a1">
              <em>{r.updatedAt.toLocaleString()}</em>
            </div>
            <div>
              <em>{r.description || 'No Description'}</em>
            </div>
          </li>
        ))}
    </List>
  );
};
