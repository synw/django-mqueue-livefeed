import { eventTypes } from "@/const";
import { reactive } from "vue";

export default class EventsQueue {
  counter = reactive<Record<string, number>>({});

  constructor() {
    // initialize event types counter
    eventTypes.forEach((et) => {
      this.counter[et] = 0;
    });
  }

  increment(eventType: string): void {
    this.counter[eventType]++;
  }
}