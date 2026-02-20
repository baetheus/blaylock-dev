import * as T from "@baetheus/pick/tokens";
import * as Effect from "@baetheus/fun/effect";

import * as API from "@/lib/api.ts";

import {
  newHttpBatchRpcResponse,
  newWebSocketRpcSession,
  RpcTarget,
} from "capnweb";

class MyApiServer extends RpcTarget implements API.HelloAPI {
  hello(name: string) {
    console.log(`Server is saying hello to ${name}`);
    return `Hello, ${name}!`;
  }
}

export default T.get(
  Effect.gets(async (req) => {
    if (req.headers.get("upgrade") === "websocket") {
      const { socket, response } = Deno.upgradeWebSocket(req);
      socket.addEventListener("open", () => {
        newWebSocketRpcSession(socket, new MyApiServer());
      });
      return response;
    } else {
      const response = await newHttpBatchRpcResponse(req, new MyApiServer());
      return response;
    }
  }),
);
