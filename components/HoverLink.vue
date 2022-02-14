<template>
  <a :href="href" :target="target" :rel="rel" class="hover-link">
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
    },
    target: {
      type: String,
      required: false
    },
    rel: {
      type: String,
      required: false
    }
  }
})
</script>

<style src="./HoverLink.css" scoped/>