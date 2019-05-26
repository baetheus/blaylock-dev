import { Task } from 'fp-ts/lib/Task';
import * as io from 'io-ts';
import { createOptionFromNullable, DateFromISOString } from 'io-ts-types';
import { fromEither, Req } from 'libraries/req';

const getGithubQuery = `{ viewer { gists(last:50) { nodes { name description updatedAt } } repositories(last:50) { nodes { nameWithOwner description url updatedAt } } } organization(login: "nullpub") { repositories(last: 50) { nodes { nameWithOwner description url updatedAt } } }}`;

const headers = {
  Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_TOKEN}`,
};

const url = 'https://api.github.com/graphql';

const RepositoryIO = io.interface({
  nameWithOwner: io.string,
  description: createOptionFromNullable(io.string),
  url: io.string,
  updatedAt: DateFromISOString,
});

const GistIO = io.interface({
  name: io.string,
  description: createOptionFromNullable(io.string),
  updatedAt: DateFromISOString,
});

const GetGithub = io.interface({
  data: io.interface({
    viewer: io.interface({
      gists: io.interface({
        nodes: io.array(GistIO),
      }),
      repositories: io.interface({
        nodes: io.array(RepositoryIO),
      }),
    }),
    organization: io.interface({
      repositories: io.interface({
        nodes: io.array(RepositoryIO),
      }),
    }),
  }),
});

export type GetGithubT = Req<io.Errors, typeof GetGithub._A>;
export type RepositoryT = (typeof RepositoryIO._A)[];
export type GistT = (typeof GistIO._A)[];

export const getGithub = new Task(() =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({ query: getGithubQuery }),
    headers,
  })
    .then(res => res.json())
    .then(GetGithub.decode)
    .then(fromEither)
);
