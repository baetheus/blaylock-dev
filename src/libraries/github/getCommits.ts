import { AsyncData, fromEither } from '@nll/dux';
import { of, Task } from 'fp-ts/lib/Task';
import * as t from 'io-ts';
import { DateFromISOString } from 'io-ts-types/lib/DateFromISOString';

const getGithubQuery = `{ viewer { gists(last:5) { nodes { name description updatedAt } } repositories(last:5) { nodes { nameWithOwner description url updatedAt } } } organization(login: "nullpub") { repositories(last: 5) { nodes { nameWithOwner description url updatedAt } } }}`;

const headers = {
  Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
};

const url = 'https://api.github.com/graphql';

export const Repository = t.intersection([
  t.type({
    nameWithOwner: t.string,
    url: t.string,
    updatedAt: DateFromISOString,
  }),
  t.partial({
    description: t.string,
  }),
]);
export type Repository = t.TypeOf<typeof Repository>;

export const Gist = t.intersection([
  t.type({
    name: t.string,
    updatedAt: DateFromISOString,
  }),
  t.partial({
    description: t.string,
  }),
]);
export type Gist = t.TypeOf<typeof Gist>;

export const Github = t.type({
  data: t.type({
    viewer: t.type({
      gists: t.type({
        nodes: t.array(Gist),
      }),
      repositories: t.type({
        nodes: t.array(Repository),
      }),
    }),
    organization: t.type({
      repositories: t.type({
        nodes: t.array(Repository),
      }),
    }),
  }),
});
export type Github = t.TypeOf<typeof Github>;

export type GithubAD = AsyncData<t.Errors, Github>;

export const getGithub: Task<GithubAD> = () =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({ query: getGithubQuery }),
    headers,
  })
    .then(res => res.json())
    .then(Github.decode)
    .then(fromEither);
