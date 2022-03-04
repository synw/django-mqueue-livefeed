import { User } from "@snowind/state";
import EventsQueue from "./models/events_queue";

const eventsQueue = new EventsQueue();
const user = new User();

export { user, eventsQueue }