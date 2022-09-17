<template>
  <div class="ctf">
    <h1>PING CTF 2022</h1>
    <p>
      <HoverLink :href="'https://ctf.knping.pl/'" target="_blank">{{ translatedInfo }}</HoverLink>
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HoverLink from '~/components/HoverLink.vue'
import { mapGetters } from 'vuex';
import getCtf from '~/graphql/getCtf.gql';
import { client } from '~/apollo/client';

export default Vue.extend({
  name: "ctf",
  components: { HoverLink },
  data() {
    return {
      info: {}
    }
  },
  computed: {
    ...mapGetters([
      'lang'
    ]),
    translatedInfo() {
      return this.info[this.lang.substring(0,2)]
    }
  },
  async asyncData() {
    const { data } = await client.query({ query: getCtf });
    const node = data.allCtfs.edges[0].node;
    const info = {
      pl: node.pl[0].text,
      en: node.en[0].text
    }

    return {
      info
    }
  }

})
</script>

<style src="./ctf.css" scoped/>
