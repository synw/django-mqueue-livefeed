<template>
  <div class="overflow-auto h-80">
    <div class="text-2xl">
      {{ site.name }}
      <span
        v-if="site.hasMessages"
        class="ml-2 text-base text-light"
      >( {{ site.numMessages }} )</span>
    </div>
    <div v-if="site.hasMessages === true" class="mt-3 space-y-2">
      <div v-for="(event,i) in site.messages.value" :key="i">
        <event-badge :event-class="event.eventClass"></event-badge>
        &nbsp;{{ event.msg }}
      </div>
    </div>
    <div v-else class="mt-8 ml-5">
      <i-fa-regular-bell-slash class="text-3xl text-light"></i-fa-regular-bell-slash>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Site from '@/models/site';
import { eventIcons } from '@/const';
import EventBadge from './EventBadge.vue';

export default defineComponent({
  components: {
    EventBadge
  },
  props: {
    site: {
      type: Site,
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

