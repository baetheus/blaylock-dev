import { FunctionalComponent, h } from 'preact';
import { List, ListHeader } from '~/components/List';
import { Gist } from '~/store/github';

export interface GistsProps {
  gists?: Gist[];
  showCount?: number;
}

/**
 * @render react
 * @name Gists
 * @example
 * <Gists />
 */
export const Gists: FunctionalComponent<GistsProps> = ({
  gists = [],
  showCount = 5,
}) => {
  return (
    <List
      title={
        <ListHeader
          prefix="gists"
          link="https://gist.github.com/baetheus"
          text="baetheus"
        ></ListHeader>
      }
    >
      {gists.length === 0 && <div>No Gistsitories!</div>}
      {gists
        .sort((a: any, b: any) => b.updatedAt - a.updatedAt)
        .slice(0, showCount)
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
    </List>
  );
};
