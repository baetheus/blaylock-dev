import { Task } from 'fp-ts/lib/Task';
import * as io from 'io-ts';
import { createOptionFromNullable, DateFromISOString } from 'io-ts-types';
import { fromEither, Req } from 'libraries/req';

const devtoUrl = 'https://dev.to/api/';

const UserIO = io.interface({
  name: io.string,
  username: io.string,
  twitter_username: createOptionFromNullable(io.string),
  github_username: createOptionFromNullable(io.string),
  website_url: createOptionFromNullable(io.string),
  profile_image: createOptionFromNullable(io.string),
  profile_image_90: createOptionFromNullable(io.string),
});

const ArticleIO = io.interface({
  type_of: io.string,
  id: io.number,
  title: io.string,
  description: io.string,
  cover_image: createOptionFromNullable(io.string),
  published_at: DateFromISOString,
  tag_list: io.array(io.string),
  slug: io.string,
  path: io.string,
  url: io.string,
  canonical_url: io.string,
  comments_count: io.number,
  positive_reactions_count: io.number,
  published_timestamp: DateFromISOString,
  user: UserIO,
});

const GetArticlesIO = io.array(ArticleIO);

export type ArticleT = typeof ArticleIO._A;
export type GetArticlesT = Req<io.Errors, io.TypeOf<typeof GetArticlesIO>>;

export const getArticles = (username: string) =>
  new Task(() =>
    fetch(`${devtoUrl}/articles?username=${username}`)
      .then(res => res.json())
      .then(GetArticlesIO.decode)
      .then(fromEither)
  );
