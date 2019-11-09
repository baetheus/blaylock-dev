import { FunctionalComponent, h } from 'preact';

export interface ListHeaderProps {
  prefix: string;
  link: string;
  text: string;
}

/**
 * @name ListHeader
 * @example
 * <ListHeader />
 */
export const ListHeader: FunctionalComponent<ListHeaderProps> = ({
  link,
  prefix,
  text,
}) => {
  return (
    <h2>
      {prefix}/
      <a href={link} target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    </h2>
  );
};
