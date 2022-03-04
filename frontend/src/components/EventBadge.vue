<template>
  <span class="mq-label" :class="`mq-${eventClass}`">
    <i :class="eventIcons[eventClass]"></i>
    <span class="ml-1 capitalize">{{ eventClass }}</span>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { eventIcons } from '../const';

export default defineComponent({
  props: {
    eventClass: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {
      eventIcons
    }
  }
})
</script>