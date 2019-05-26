import { Pending } from 'components/Req';
import { formatValidationError } from 'io-ts-reporters';
import { getGithub, GetGithubT } from 'libraries/github';
import { pending } from 'libraries/req';
import React, { useState } from 'react';

import { Gists } from './Gists';
import { Repos } from './Repositories';

export interface GithubProps {}

/**
 * @render react
 * @name Github
 * @example
 * <Github />
 */
export const Github: React.FC<GithubProps> = () => {
  const [res, setRes] = useState<GetGithubT>(pending());

  if (res.type === 'Pending') {
    getGithub.run().then(setRes);
  }

  return (
    <section className="fld-column flg-4">
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
      {res.fold(
        <Pending />,
        err => (
          <pre>{err.map(formatValidationError).join('\n\n')}</pre>
        ),
        data => (
          <>
            <Repos
              repos={data.data.viewer.repositories.nodes.concat(
                data.data.organization.repositories.nodes
              )}
            />
            <Gists gists={data.data.viewer.gists.nodes} />
          </>
        ),
        data => (
          <div>
            <div>Refreshing...</div>
            <Repos
              repos={data.data.viewer.repositories.nodes.concat(
                data.data.organization.repositories.nodes
              )}
            />
            <Gists gists={data.data.viewer.gists.nodes} />
          </div>
        )
      )}
    </section>
  );
};
