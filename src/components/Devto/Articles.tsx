import { FunctionalComponent, h } from 'preact';
import { Articles as ArticlesT } from '~/store/devto';

export interface ArticlesProps {
  articles?: ArticlesT;
  showCount?: number;
}

/**
 * @render react
 * @name Articles
 * @example
 * <Articles />
 */
export const Articles: FunctionalComponent<ArticlesProps> = ({
  articles = [],
  showCount = 5,
}) => {
  return (
    <ul class="fld-col flg-4">
      {articles.length === 0 && <div>No Blog Articles!</div>}
      {articles
        .sort((a: any, b: any) => b.publishedAt - a.publishedAt)
        .slice(0, showCount)
        .map(a => (
          <li class="fld-col" key={a.id}>
            <div class="fs-u1">
              <a
                href={a.canonical_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {a.title}
              </a>
            </div>
            <div class="fs-d2 cf-a1">
              <em>{a.published_at.toLocaleString()}</em>
            </div>
            <p>{a.description || 'No Description'}</p>
          </li>
        ))}
    </ul>
  );
};
