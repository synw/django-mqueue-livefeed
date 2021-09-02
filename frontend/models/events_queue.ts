import { useIntervalFn } from '@vueuse/core';
import drawSparkline from "@/sparkline";
import { eventTypes } from "@/const";
import { reactive } from "vue";

export default class EventsQueue {
  counter = reactive<Record<string, number>>({});
  _timeframe = 5000;
  _timeline: Array<number> = new Array(60).fill(0);
  _timebucket = 0;

  constructor() {
    //drawSparkline(this._timeline);
    // initialize event types counter
    eventTypes.forEach((et) => {
      this.counter[et] = 0;
    });
    // manage the timebucket
    useIntervalFn(() => {
      // console.log("Draw", this._timeline);
      this._timeline.push(this._timebucket);
      this._timeline.shift();
      this._timebucket = 0;
      drawSparkline(this._timeline);
    }, this._timeframe);
  }

  increment(eventType: string): void {
    this.counter[eventType]++;
    this._timebucket++;
  }
}