import { Instant, Message } from "djangoinstant";
import { sites } from "@/const";
import { eventsQueue } from "./state";

let instant = new Instant(
  "http://localhost:8000", // Django backend's address
  "ws://localhost:8001", // Centrifugo server's address
  true, // verbosity (optional, default: false)
);

function _onMessage(msg: Message): void {
  sites[msg.site].messages.value.unshift(msg);
  eventsQueue.increment(msg.eventClass);
}

function initWs() {
  const uriFromBackend = localStorage.getItem("wsUri");
  let uri = "ws://localhost:8001";
  if (uriFromBackend !== null) {
    if (!import.meta.env.DEV) {
      uri = uriFromBackend
    } else {
      const u = import.meta.env.VITE_WS_SERVER_URI;
      if (u) {
        uri = u.toString()
      } else {
        throw new Error("Can not find dev websockets uri")
      }
    }
  }
  instant = new Instant("http://localhost:8000", uri, true);
  instant.onMessage = _onMessage;
}

async function connectWs() {
  await instant.get_token();
  await instant.connect();
}

export { instant, initWs, connectWs }