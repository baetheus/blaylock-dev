if (process.env.NODE_ENV === "development") {
  require("preact/debug");
}

import "~/store/store";

import { h, render } from "preact";
import { Router } from "preact-router";

import { About } from "~/routes/About";
import { Home } from "~/routes/Home";
import { NotFound } from "~/routes/NotFound";
import { Colophon } from "./routes/Colophon";

const App = () => (
  <Router>
    <Home path="/" />
    <About path="/about" />
    <Colophon path="/colophon" />
    <NotFound default />
  </Router>
);

render(<App />, document.body);
