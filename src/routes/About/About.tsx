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
    <main className="vw-p100 vhmn-vh100 fld-col flg-5 ai-ctr vwc-p100 vwcmx-em0 pwa-5">
      <Header />
      <p>
        I'm a software engineer currently working out of the Sacramento Valley.
      </p>
    </main>
  );
};
