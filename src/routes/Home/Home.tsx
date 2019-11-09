import { isInitial } from '@nll/datum/lib/Datum';
import { refreshFold } from '@nll/datum/lib/DatumEither';
import { FunctionalComponent, h } from 'preact';
import { useEffect } from 'preact/hooks';
import { Failure, Pending } from '~/components/Async';
import { Articles } from '~/components/Devto';
import { Footer } from '~/components/Footer';
import { Gists, Repos } from '~/components/Github';
import { Header } from '~/components/Header';
import { environment, version } from '~/environments';
import { articlesDataL, gistsDataL, reposDataL, useRedux } from '~/store';
import { Articles as ArticlesData, getArticles } from '~/store/devto';
import { getGists, getRepos, GistData, RepoData } from '~/store/github';

export interface HomeProps {}

const constPending = () => <Pending />;

/**
 * @name Home
 * @example
 * <Home />
 */
export const Home: FunctionalComponent<HomeProps> = () => {
  const [gistsData, dispatch] = useRedux(gistsDataL.get);
  const [reposData] = useRedux(reposDataL.get);
  const [articlesData] = useRedux(articlesDataL.get);

  useEffect(() => {
    dispatch(getArticles.pending('baetheus'));
    dispatch(getRepos.pending());
    dispatch(getGists.pending());
  }, []);

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
          (gists: GistData) => <Gists gists={gists.data.viewer.gists.nodes} />
        )(gistsData)}
        {refreshFold(
          constPending,
          constPending,
          errors => (
            <Failure
              title="Error getting data from github.com"
              error={errors}
            />
          ),
          (repos: RepoData) => (
            <Repos repos={repos.data.viewer.repositories.nodes} />
          )
        )(reposData)}
        {refreshFold(
          constPending,
          constPending,
          errors => (
            <Failure
              title="Error getting articles from dev.to"
              error={errors}
            />
          ),
          (articles: ArticlesData) => <Articles articles={articles} />
        )(articlesData)}
      </section>
      <Footer link={environment.versionUrl} version={version} />
    </main>
  );
};
