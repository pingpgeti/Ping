<template>
  <a :href="href" class="hover-link">
    <slot/>
  </a>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'HoverLink',
  props: {
    href: {
      type: String,
      required: true
    }
  }
})
</script>

<style src="./HoverLink.css" scoped/>