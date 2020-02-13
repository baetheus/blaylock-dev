import { FunctionalComponent, h } from 'preact';
import { Header } from '~/components/Header';
import { Footer } from '~/components/Footer';
import { environment } from '~/environments';

export interface ColophonProps {}

/**
 * @name Colophon
 * @example
 * <Colophon />
 */
export const Colophon: FunctionalComponent<ColophonProps> = () => {

  return (
    <main className="vw-p100 vhmn-vh100 fld-col flg-5 ai-ctr vwc-p100 vwcmx-rem0 pwa-5 ovx-hi">
    <Header />
    <article class="fld-col flg-4">
      <h3 class="mwxr-7 pwx-7 pwy-5 ct-b1">
        Colophon
      </h3>
      <p>
        This site is an ongoing project that I use to play with various technologies, code patterns, deployment options, and integrations.
      </p>
      <p>The <a href="https://github.com/baetheus/blaylock-dev">current implementation</a> uses:</p>
      <ul style="list-style: inside;">
        <li><a href="https://github.com/preactjs/preact">Preact</a>: For its small size compared to React</li>
        <li><a href="https://github.com/reduxjs/redux">Redux</a>: For its simple state management implementation</li>
        <li><a href="https://github.com/microsoft/TypeScript">TypeScript</a>: For its strong type support</li>
        <li><a href="https://github.com/ReactiveX/rxjs">rxjs</a>: For its ajax implementation and the occasional animation</li>
        <li><a href="https://github.com/gcanti/fp-ts">fp-ts</a>: For its Functor and Monad implementations</li>
        <li><a href="https://github.com/gcanti/io-ts">io-ts</a>: For its data validation</li>
        <li><a href="https://github.com/gcanti/monocle-ts">monocle-ts</a>: For functional data accessors</li>
        <li><a href="https://github.com/nullpub/css">@nll/css</a>: For its clean and modular utility classes</li>
        <li><a href="https://github.com/nullpub/datum">@nll/datum</a>: For its DatumEither ADT</li>
        <li><a href="https://github.com/nullpub/dux">@nll/dux</a>: For its Redux helper functions</li>
      </ul>
      <p>In addition to these open source libraries it uses <a href="https://github.com/parcel-bundler/parcel">parcel</a> as the bundler and <a href="https://www.netlify.com/">Netlify</a> as the hosting provider</p>
    </article>
    <Footer link={environment.versionUrl} version={environment.version} />
  </main>
  )
};
