import { DatumEither, fromEither } from '@nll/datum/lib/DatumEither';
import { isLeft } from 'fp-ts/lib/Either';
import { Task } from 'fp-ts/lib/Task';
import * as t from 'io-ts';
import { reporter } from 'io-ts-reporters';
import { DateFromISOString } from 'io-ts-types/lib/DateFromISOString';

export const User = t.intersection([
  t.type({
    name: t.string,
    username: t.string,
  }),
  t.partial({
    twitter_username: t.union([t.string, t.null]),
    github_username: t.string,
    website_url: t.string,
    profile_image: t.string,
    profile_image_90: t.string,
  }),
]);
export type User = t.TypeOf<typeof User>;

export const Article = t.intersection([
  t.type({
    type_of: t.string,
    id: t.number,
    title: t.string,
    published_at: DateFromISOString,
  }),
  t.partial({
    description: t.string,
    tag_list: t.array(t.string),
    slug: t.string,
    path: t.string,
    url: t.string,
    canonical_url: t.string,
    comments_count: t.number,
    positive_reactions_count: t.number,
    published_timestamp: DateFromISOString,
    user: User,
    cover_image: t.union([t.string, t.null]),
  }),
]);
export type Article = t.TypeOf<typeof Article>;

export const Articles = t.array(Article);
export type Articles = t.TypeOf<typeof Articles>;

export type ArticlesAD = DatumEither<t.Errors, Articles>;

export const getArticlesTask = (
  username: string,
  devtoUrl = 'https://dev.to/api/'
): Task<ArticlesAD> => () =>
  fetch(`${devtoUrl}/articles?username=${username}`)
    .then(res => res.json())
    .then(Articles.decode)
    .then(e => {
      if (isLeft(e)) {
        console.log('Validation Error during ');
        console.log(reporter(e).join('\n\n'));
      }
      return e;
    })
    .then(t => fromEither(() => t));
