<template>
  <div class="ctf">
    <h1>{{ title }}</h1>
    <p><b>
      <HoverLink :href=ctfLink target="_blank">{{ translatedInfo }}</HoverLink>
    </b></p>
    <p>
      <HoverLink :href=discordLink target="_blank">&gt;&gt; discord &lt;&lt; </HoverLink>
    </p>
    <p>
      <HoverLink :href=ctftimeLink target="_blank">&gt;&gt; ctftime &lt;&lt;</HoverLink>
    </p>
    <div v-if="displayTimer" class="ctf__counter counter">
      <div class="counter__unit">
        <b>{{ days }}</b>
        <p>Days</p>
      </div>
      <div class="counter__unit">
        <b>{{ hours }}</b>
        <p>Hours</p>
      </div>
      <div class="counter__unit">
        <b>{{ minutes }}</b>
        <p>Minutes</p>
      </div>
      <div class="counter__unit">
        <b>{{ seconds }}</b>
        <p>Seconds</p>
      </div>
    </div>
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
      info: {},
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      interval: null
    }
  },
  computed: {
    ...mapGetters([
      'lang'
    ]),
    translatedInfo() {
      return this.info[this.lang.substring(0,2)];
    },
    displayTimer() {
      return !(this.days <= 0 && this.hours <=0 && this.minutes <= 0 && this.seconds <= 0);
    },
    discordLink() {
      return this.info.links.discord;
    },
    ctftimeLink() {
      return this.info.links.ctftime;
    },
    ctfLink() {
      return this.info.links.ctf;
    },
    title() {
      return this.info.title;
    }
  },
  async asyncData() {
    const { data } = await client.query({ query: getCtf });
    const node = data.allCtfs.edges[0].node;
    const info = {
      pl: node.pl[0].text,
      en: node.en[0].text,
      date: node.date,
      title: node.title,
      links: {
        discord: node.discord_link,
        ctftime: node.ctftime_link,
        ctf: node.ctf_link
      }
    }

    return {
      info
    }
  },
  mounted() {
    const futureDate = new Date(this.info.date);
    const now = new Date();
    const totalSeconds = (futureDate.getTime() - now.getTime()) / 1000;

    this.days = Math.trunc(totalSeconds / 60 / 60 / 24);
    this.hours = Math.trunc(totalSeconds / 60 / 60) % 24;
    this.minutes = Math.trunc(totalSeconds / 60) % 60;
    this.seconds = Math.trunc(totalSeconds) % 60;

    this.interval = setInterval(() => {
      this.seconds--;
      if(this.seconds < 0) {
        this.seconds = 59;
        this.minutes--;
        if(this.minutes < 0) {
          this.minutes = 59;
          this.hours--;
          if(this.hours < 0) {
            this.hours = 23;
            this.days--;
          }
        }
      }

    }, 1000);

  },
  destroyed() {
    clearInterval(this.interval);
  }

})
</script>

<style src="./ctf.css" scoped/>
