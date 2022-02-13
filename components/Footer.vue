<template>
  <footer class="footer">
    <span class="footer__caption">
      web powered by
      <HoverLink class="link" href="https://mikr.us">mikr.us</HoverLink>
    </span>
    <span class="footer__caption">
      Made by
      <HoverLink class="link" href="https://github.com/mobaradev">MObara</HoverLink> and
      <HoverLink class="link" href="https://github.com/JakubK">JakubK</HoverLink>
    </span>
    <span class="footer__caption">
      designed by
      <HoverLink href="https://www.instagram.com/kocurrok/">kocurrok</HoverLink>
    </span>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'
import HoverLink from './HoverLink.vue'
export default Vue.extend({
    name: "Footer",
    components: { HoverLink }
})
</script>

<style src="./Footer.css" scoped></style>
