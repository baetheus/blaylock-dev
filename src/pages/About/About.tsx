import './About.css';

import { Header } from 'components/Header';
import React from 'react';

export interface AboutProps {}

/**
 * @render react
 * @name About
 * @example
 * <About />
 */
export const About: React.FC<AboutProps> = () => {
  return (
    <main className="page--about fld-column flg-5 flai-center pa-5">
      <Header />
      <section>
        <h2>About</h2>
        <p>I'm a software engineer currently working out of Sacramento, CA.</p>
      </section>
    </main>
  );
};
