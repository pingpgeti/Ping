<template>
  <span>
    <a v-if="!isNuxtLink" :href="href" :target="target" :rel="rel" class="hover-link">
      <slot/>
    </a>
    <NuxtLink v-else :to="href" class="hover-link hover-link--nuxt">
      <slot/>
    </NuxtLink>
  </span>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'HoverLink',
  props: {
    isNuxtLink: {
      type: Boolean,
      default: false
    },
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