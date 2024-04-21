import { Websocket, WebsocketBuilder } from "websocket-ts";
import chalk from "chalk";

type SolanaSimulateCluster = "Mainnet" | "Devnet";

type SolanaSimulateRequest = {
  event: "solanaSimulate";
  data: {
    fnKey: string;
    cluster: SolanaSimulateCluster;
    params: {
      container?: string;
      containerRegistry?: string;
      version?: string;
      fnRequestKey?: string;
    };
  };
};

const postMessage = (
  ws: Websocket,
  type: "sys" | "info" | "error",
  message: string
) => {
  const isOpen =
    ws.underlyingWebsocket &&
    ws.underlyingWebsocket.readyState === ws.underlyingWebsocket.OPEN;
  if (!isOpen) return;

  switch (type) {
    case "sys":
      return console.log(chalk.yellowBright.bold(`[sys] ${message}`));
    case "info":
      return console.log(`[info] ${message}`);
    case "error":
      return console.error(chalk.redBright.bold(`[error] ${message}`));
  }
};

(async () => {
  const CLUSTER: SolanaSimulateCluster = "Devnet";
  const FUNCTION_PUBKEY = "iczDyLZyETojVUaEwnkXkSBRXzjVNX2JpFHsmV3iUGv";
  const REQUEST_PUBKEY = "Ebe9etDJpXBjiV7hvQcitqfBwMfxwQGCcjBb34Eom29N";

  const request: SolanaSimulateRequest = {
    event: "solanaSimulate",
    data: {
      cluster: CLUSTER,
      fnKey: FUNCTION_PUBKEY,
      params: {
        fnRequestKey: REQUEST_PUBKEY,
      },
    },
  };

  new WebsocketBuilder("wss://functions.switchboard.xyz")
    .onOpen((ws) => {
      postMessage(ws, "sys", "Connection was opened...\n");

      // When the websocket opens, send the simulation request.
      ws.send(JSON.stringify(request));
    })
    .onMessage((ws, event) => postMessage(ws, "info", event.data.toString()))
    .onError((ws) => postMessage(ws, "error", "An error occurred..."))
    .build();
})();
