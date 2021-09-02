<template>
  <div>
    <svg class="sparkline sparkline--main" width="640" height="30" stroke-width="3" />
    <svg
      class="sparkline sparkline--main sparkline--filled"
      width="640"
      height="30"
      stroke-width="3"
    />
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
  }
})
</script>

<style lang="sass">
.sparkline--main
  stroke: rgba(6, 182, 212, 1)
.sparkline--main, .sparkline--filled
  fill: rgba(6, 182, 212, 0.5)
</style>