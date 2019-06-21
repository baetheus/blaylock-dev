import { FunctionalComponent, h } from 'preact';
import { Failure, Pending } from '~/components/Async';
import { Devto } from '~/components/Devto';
import { Github } from '~/components/Github';
import { Header } from '~/components/Header';
import { getArticlesTask } from '~/libraries/devto';
import { getGithub } from '~/libraries/github';
import { useTaskData } from '~/libraries/task';

export interface HomeProps {}

const getArticles = getArticlesTask('baetheus');

/**
 * @name Home
 * @example
 * <Home />
 */
export const Home: FunctionalComponent<HomeProps> = () => {
  const articlesD = useTaskData(getArticles);
  const githubD = useTaskData(getGithub);

  return (
    <main className="vw-p100 vhmn-vh100 fld-col flg-5 ai-ctr vwc-p100 vwcmx-em0 pwa-5">
      <Header />
      <section>
        <h3>Hi, I'm Brandon and this is what I've been doing lately.</h3>
      </section>
      <section class="fld-sm-row fld-col flg-5 vwc-p100">
        {githubD.fold(
          <Pending />,
          <Pending />,
          errors => (
            <Failure
              title="Error getting data from github.com"
              error={errors}
            />
          ),
          github => (
            <Github github={github} />
          )
        )}
        {articlesD.fold(
          <Pending />,
          <Pending />,
          errors => (
            <Failure
              title="Error getting articles from dev.to"
              error={errors}
            />
          ),
          articles => (
            <Devto articles={articles} />
          )
        )}
      </section>
    </main>
  );
};
