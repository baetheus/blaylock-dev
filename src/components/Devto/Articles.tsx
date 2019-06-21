import { FunctionalComponent, h } from 'preact';
import { Articles as ArticlesT } from '~/libraries/devto';

export interface ArticlesProps {
  articles?: ArticlesT;
}

/**
 * @render react
 * @name Articles
 * @example
 * <Articles />
 */
export const Articles: FunctionalComponent<ArticlesProps> = ({
  articles = [],
}) => {
  return (
    <ul className="fld-col flg-4">
      {articles.length === 0 && <div>No Blog Articles!</div>}
      {articles
        .sort((a: any, b: any) => b.publishedAt - a.publishedAt)
        .map(a => (
          <li className="fld-col flg-3" key={a.id}>
            <div className="font-header fsu-2">
              <a
                href={a.canonical_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {a.title}
              </a>
            </div>
            <div className="fsd-1">
              <em>{a.published_at.toLocaleString()}</em>
            </div>
            <p>{a.description || 'No Description'}</p>
          </li>
        ))}
    </ul>
  );
};
