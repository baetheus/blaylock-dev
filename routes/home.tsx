import * as T from "@baetheus/pick/tokens";

export function Home() {
  return <h1>Hello Brandon</h1>;
}

export const default_route = T.client_default.create(Home);

export const index_route = T.client_route.create(Home);
