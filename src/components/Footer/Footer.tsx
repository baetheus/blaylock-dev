import { FunctionalComponent, h } from 'preact';

export interface FooterProps {
  version: string;
  link: string;
}

/**
 * @name Footer
 * @example
 * <Footer />
 */
export const Footer: FunctionalComponent<FooterProps> = ({ link, version }) => {
  return (
    <footer class="fld-row ai-ctr jc-ctr">
      <span class="fs-u1">
        Version <a href={`${link}${version}`}>{version}</a>
      </span>
    </footer>
  );
};
