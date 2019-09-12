import { isInitial } from '@nll/datum/lib/Datum';
import { refreshFold } from '@nll/datum/lib/DatumEither';
import { FunctionalComponent, h } from 'preact';
import { useEffect } from 'preact/hooks';
import { Failure, Pending } from '~/components/Async';
import { Devto } from '~/components/Devto';
import { Footer } from '~/components/Footer';
import { Github } from '~/components/Github';
import { Header } from '~/components/Header';
import { environment, version } from '~/environments';
import { articlesDataL, githubDataL, useRedux } from '~/store';
import { Articles, getArticles } from '~/store/devto';
import { getGithub } from '~/store/github';
import { GithubData } from '~/store/github/validators';

export interface HomeProps {}

const constPending = () => <Pending />;

/**
 * @name Home
 * @example
 * <Home />
 */
export const Home: FunctionalComponent<HomeProps> = () => {
  const [githubData, dispatch] = useRedux(githubDataL.get);
  const [articlesData] = useRedux(articlesDataL.get);

  useEffect(() => {
    if (isInitial(githubData) || isInitial(articlesData)) {
      dispatch(getArticles.pending('baetheus'));
      dispatch(getGithub.pending());
    }
  }, [githubData, articlesData]);

  return (
    <main className="vw-p100 vhmn-vh100 fld-col flg-5 ai-ctr vwc-p100 vwcmx-rem0 pwa-5 ovx-hi">
      <Header />
      <section>
        <h3 class="mwxr-7 pwx-7 pwy-5 ct-b1">
          Hi, I'm Brandon Blaylock. I work as a front end engineer on web and
          native applications, but I also write non-ui stuff from time to time.
          Following are the most recent open source projects or blog entries
          that I've contributed to.
        </h3>
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
          (github: GithubData) => <Github github={github} />
        )(githubData)}
        {refreshFold(
          constPending,
          constPending,
          errors => (
            <Failure
              title="Error getting articles from dev.to"
              error={errors}
            />
          ),
          (articles: Articles) => <Devto articles={articles} />
        )(articlesData)}
      </section>
      <Footer link={environment.versionUrl} version={version} />
    </main>
  );
};
