<template>
  <div class="ctf">
    <h1>PING CTF 2022</h1>
    <p><HoverLink :href="'https://ctf.knping.pl/'" target="_blank">więcej informacji wkrótce</HoverLink></p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HoverLink from '~/components/HoverLink.vue'
export default Vue.extend({
    name: "ctf",
    components: { HoverLink }
})
</script>

<style src="./ctf.css" scoped/>