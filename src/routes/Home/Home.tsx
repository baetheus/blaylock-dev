import { refreshFold } from "@nll/datum/DatumEither";
import { FunctionalComponent, h } from "preact";
import { useEffect } from "preact/hooks";
import { Failure, Pending } from "~/components/Async";
import { Footer } from "~/components/Footer";
import { Gists, Repos } from "~/components/Github";
import { Header } from "~/components/Header";
import { environment } from "~/environments";
import { useGithub, GistData, RepoData, getGists, getRepos } from "~/store/github";
import { identity } from "fp-ts/es6/function";

export interface HomeProps {}

const constPending = () => <Pending />;
const constGists = refreshFold(
  constPending,
  constPending,
  errors => <Failure title="Error getting data from github.com" error={errors} />,
  (gists: GistData) => <Gists gists={gists.data.viewer.gists.nodes} />
);
const constRepos = refreshFold(
  constPending,
  constPending,
  errors => <Failure title="Error getting data from github.com" error={errors} />,
  (repos: RepoData) => <Repos repos={repos.data.viewer.repositories.nodes} />
);

/**
 * @name Home
 * @example
 * <Home />
 */
export const Home: FunctionalComponent<HomeProps> = () => {
  const [{ gists, repos }, dispatch] = useGithub(identity);

  useEffect(() => {
    dispatch(getRepos.pending());
    dispatch(getGists.pending());
  }, []);

  return (
    <main className="vw-p100 vhmn-vh100 fld-col flg-5 ai-ctr vwc-p100 vwcmx-rem0 pwa-5 ovx-hi">
      <Header />
      <section>
        <h3 class="mwxr-7 pwx-7 pwy-5 ct-b1">
          Hi, I'm Brandon Blaylock. I work as a front end engineer on web and native applications,
          but I also write non-ui stuff from time to time. Following are the most recent open source
          projects or blog entries that I've contributed to.
        </h3>
      </section>
      <section class="fld-sm-row fld-col flg-5 vwc-p100">
        {constRepos(repos)}
        {constGists(gists)}
      </section>
      <Footer link={environment.versionUrl} version={environment.version} />
    </main>
  );
};
