import { FunctionalComponent, h } from 'preact';
import { Header } from '~/components/Header';

export interface AboutProps {}

/**
 * @name About
 * @example
 * <About />
 */
export const About: FunctionalComponent<AboutProps> = () => {
  return (
    <main className="vw-p100 vhmn-vh100 fld-col flg-5 ai-ctr vwc-p100 vwcmx-rem0 pwa-5">
      <Header />
      <article class="fld-col flg-4">
      <h3 class="mwxr-7 pwx-7 pwy-5 ct-b1">
        About
      </h3>
      <p>
        I'm a software engineer currently working out of the Sacramento Valley.
      </p>
      </article>
    </main>
  );
};
