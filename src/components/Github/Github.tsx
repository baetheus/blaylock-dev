import { FunctionalComponent, h } from 'preact';
import { GithubData, Repository } from '~/store/github';

import { Gists } from './Gists';
import { Repos } from './Repositories';

export interface GithubProps {
  github: GithubData;
}

/**
 * @render react
 * @name Github
 * @example
 * <Github />
 */
export const Github: FunctionalComponent<GithubProps> = ({ github }) => {
  const {
    repositories: selfRepos,
    gists: { nodes: gists },
  } = github.data.viewer;
  const { repositories: orgRepos } = github.data.organization;
  const reposRaw = selfRepos.nodes.concat(orgRepos.nodes);
  const repos = reposRaw.reduce(
    (rs, r) => (rs.some(r1 => r1.url === r.url) ? rs : rs.concat(r)),
    [] as Repository[]
  );

  return (
    <section className="fld-col flg-5">
      <h2>
        github/
        <a
          href="https://github.com/baetheus"
          target="_blank"
          rel="noopener noreferrer"
        >
          baetheus
        </a>
      </h2>
      <Repos repos={repos} />
      <h2>
        gist/
        <a
          href="https://gist.github.com/baetheus"
          target="_blank"
          rel="noopener noreferrer"
        >
          baetheus
        </a>
      </h2>
      <Gists gists={gists} />
    </section>
  );
};
