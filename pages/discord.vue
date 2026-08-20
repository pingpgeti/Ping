<template>
  <div/>
</template>

<script lang="ts">
import Vue from 'vue'

const DISCORD_LINK = 'https://discord.gg/JyZsMEYGAn';

export default Vue.extend({
  name: "discord",
  head() {
    return {
      title: 'KN Ping | discord',
      meta: [
        { hid: 'refresh', 'http-equiv': 'refresh', content: `0; url=${DISCORD_LINK}` },
        { hid: 'robots', name: 'robots', content: 'noindex' }
      ]
    }
  },
  mounted() {
    window.location.replace(DISCORD_LINK);
  }
})
</script>
