import './Home.css';

import { Devto } from 'components/Devto';
import { Github } from 'components/Github';
import { Header } from 'components/Header';
import React from 'react';

export interface HomeProps {}

/**
 * @render react
 * @name Home
 * @example
 * <Home />
 */
export const Home: React.FC<HomeProps> = () => {
  return (
    <main className="page--home fld-column flg-5 flai-center pa-5">
      <Header />
      <section>
        <h3>Hi, I'm Brandon and this is what I've been doing lately.</h3>
      </section>
      <section className="page--home--grid">
        <Devto />
        <Github />
      </section>
    </main>
  );
};
