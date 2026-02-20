import type { FunctionComponent } from "preact";
import * as T from "@baetheus/pick/tokens";
import { newWebSocketRpcSession } from "capnweb";

type UserParams = {
  userid: string;
};

const User: FunctionComponent<UserParams> = ({ userid }) => {
  let api = newWebSocketRpcSession<{ hello: (n: string) => string }>("/api.ts");
  let result = api.hello(userid).then((res) =>
    console.log("Received response to hello", { res })
  );
  return <h1>Hello {userid}</h1>;
};

export const user_route = T.client_route.create(User);
