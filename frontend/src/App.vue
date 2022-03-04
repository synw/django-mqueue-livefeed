<template>
  <div
    :class="{ dark: user.isDarkMode.value == true }"
    class="w-screen h-screen bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark"
  >
    <div class="flex items-center w-full h-16 bg-primary text-primary-r">
      <i-gis-earth-network-o class="ml-3 text-3xl"></i-gis-earth-network-o>&nbsp;&nbsp;
      <span class="text-2xl">Mqueue Livefeed</span>
    </div>
    <div class="flex flex-row">
      <div class="flex-grow p-5">
        <div class="grid grid-cols-3 gap-6">
          <site-queue :site="sites['Site 1']"></site-queue>
          <site-queue :site="sites['Site 2']"></site-queue>
          <site-queue :site="sites['Site 3']"></site-queue>
          <site-queue :site="sites['Site 4']"></site-queue>
          <site-queue :site="sites['Site 5']"></site-queue>
          <site-queue :site="sites['Site 6']"></site-queue>
        </div>
      </div>
      <div class="flex-none w-60">
        <status-bar></status-bar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { connectWs, initWs } from '@/ws';
import { sites } from "@/const";
import { user } from "@/state";
import SiteQueue from '@/components/SiteQueue.vue';
import StatusBar from '@/components/StatusBar.vue';

onMounted(() => {
  initWs();
  connectWs();
});
</script>



