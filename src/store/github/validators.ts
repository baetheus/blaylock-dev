import * as t from 'io-ts';
import { DateFromISOString } from 'io-ts-types/lib/DateFromISOString';

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
    stargazers: t.type({
      totalCount: t.number,
    }),
    files: t.array(
      t.type({
        name: t.string,
      })
    ),
  }),
  t.partial({
    description: t.string,
  }),
]);
export type Gist = t.TypeOf<typeof Gist>;

export const GithubData = t.type({
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
export type GithubData = t.TypeOf<typeof GithubData>;