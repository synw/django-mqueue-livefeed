<template>
  <div class="flex items-center justify-center w-full p-3 bg-gray-100 border-b border-light">Status</div>
  <div class="flex flex-col w-full">
    <div
      v-for="(event,i) in Object.keys(eventsQueue.counter)"
      :key="i"
      class="flex flex-row p-3 border-b"
    >
      <div class="flex-grow">
        <event-badge :event-class="event"></event-badge>
      </div>
      <div class="flex-none">{{ eventsQueue.counter[event] }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { eventsQueue } from '@/state';
import EventBadge from './EventBadge.vue';

export default defineComponent({
  components: {
    EventBadge
  },
  setup() {
    return {
      eventsQueue
    }
  }
})
</script>
