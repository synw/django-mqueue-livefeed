import { Instant, Message } from "djangoinstant";
import { sites } from "@/const";
import { eventsQueue } from "./state";

let instant = new Instant(
  "http://localhost:8000", // Django backend's address
  "ws://localhost:8427", // Centrifugo server's address
  true, // verbosity (optional, default: false)
);

function _onMessage(msg: Message): void {
  //console.log("MSG", typeof msg, JSON.stringify(msg, null, "  "));
  sites[msg.site].messages.value.unshift(msg);
  eventsQueue.increment(msg.eventClass);
}

function initWs() {
  const uriFromBackend = localStorage.getItem("wsUri");
  let uri = "ws://localhost:8427";
  if (uriFromBackend !== null && import.meta.env.PROD) {
    uri = uriFromBackend
  }
  instant = new Instant("http://localhost:8000", uri, true);
  console.log("Ws uri", instant.websocketsUri)
  instant.onMessage = _onMessage;
}

async function connectWs() {
  await instant.get_token();
  await instant.connect();
}

export { instant, initWs, connectWs }