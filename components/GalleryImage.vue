<template>
  <div class="gallery-image">
    <img :src="src"/>
    <div class="gallery-image__text">
      {{ text }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'GalleryImage',
  props: {
    src: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: false,
      default: 'Sample Text'
    }
  }
})
</script>

<style src="./GalleryImage.css" scoped/>