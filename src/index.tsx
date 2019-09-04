import '~/store/store';

import { h, render } from 'preact';
import { Router } from 'preact-router';
import { About } from '~/routes/About';
import { Home } from '~/routes/Home';
import { NotFound } from '~/routes/NotFound';

const App = () => (
  <Router>
    <Home path="/" />
    <About path="/about" />
    <NotFound default />
  </Router>
);

render(<App />, document.body);
