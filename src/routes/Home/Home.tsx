import { refreshFold } from '@nll/datum/lib/DatumEither';
import { FunctionalComponent, h } from 'preact';
import { Failure, Pending } from '~/components/Async';
import { Devto } from '~/components/Devto';
import { Footer } from '~/components/Footer';
import { Github } from '~/components/Github';
import { Header } from '~/components/Header';
import { environment, version } from '~/environments';
import { Article, getArticlesTask } from '~/libraries/devto';
import { getGithub, Github as GithubT } from '~/libraries/github';
import { useTaskData } from '~/libraries/task';

export interface HomeProps {}

const getArticles = getArticlesTask('baetheus');
const constPending = () => <Pending />;

/**
 * @name Home
 * @example
 * <Home />
 */
export const Home: FunctionalComponent<HomeProps> = () => {
  const articlesD = useTaskData(getArticles);
  const githubD = useTaskData(getGithub);

  return (
    <main className="vw-p100 vhmn-vh100 fld-col flg-5 ai-ctr vwc-p100 vwcmx-rem0 pwa-5">
      <Header />
      <section>
        <h3>Hi, I'm Brandon and this is what I've been doing lately.</h3>
      </section>
      <section class="fld-sm-row fld-col flg-5 vwc-p100">
        {refreshFold(
          constPending,
          constPending,
          errors => (
            <Failure
              title="Error getting data from github.com"
              error={errors}
            />
          ),
          (github: GithubT) => <Github github={github} />
        )(githubD)}
        {refreshFold(
          constPending,
          constPending,
          errors => (
            <Failure
              title="Error getting articles from dev.to"
              error={errors}
            />
          ),
          (articles: Article[]) => <Devto articles={articles} />
        )(articlesD)}
      </section>
      <Footer link={environment.versionUrl} version={version} />
    </main>
  );
};
