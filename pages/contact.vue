<template>
  <div class="contact">
    <div class="contact__info">
      <h1>{{ translatedTitle }}</h1>
      <div class="contact__why">
        <div>
          <h3 v-for="(element, index) in translatedJoin" :key="index">{{ element }}</h3>
        </div>
      </div>
      <div class="contact__forms">
        <h3>{{ contact.mail }}</h3>
        <h3>{{ contact.facebook }}</h3>
      </div>
    </div>
    <div class="contact__separator"/>
    <div class="contact__where">
      <h3>{{ translatedLocation }}</h3>
      <a class="contact__map" href="https://maps.app.goo.gl/B2dyThoGf1Weep1R7">
        <img alt="map" src="/map.png"/>
      </a>
    </div>
    <Footer/>
  </div> 
</template>

<script lang="ts">
import Vue from 'vue'
import getContact from '~/graphql/getContact.gql';
import { client } from '~/apollo/client';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'Contact',
  data() {
    return {
      contact: {}
    }
  },
  computed: {
    ...mapGetters([
      'lang'
    ]),
    translatedTitle() {
      return this.contact[this.lang.substring(0,2)].title
    },
    translatedLocation() {
      return this.contact[this.lang.substring(0,2)].location
    },
    translatedJoin() {
      return this.contact[this.lang.substring(0,2)].join    
    }
  },
  async asyncData() {
    const { data } = await client.query({query: getContact});
    const node = data.allContacts.edges[0].node;
    const mail = node.mail[0].text;
    const facebook = node.facebook[0].text;
    const pl = {
      title: node.pl[0].title[0].text,
      location: node.pl[0].location,
      join: node.pl[0].join.map(x => x.text)
    }
    const en = {
      title: node.en[0].title[0].text,
      location: node.en[0].location,
      join: node.en[0].join.map(x => x.text)
    }

    const contact = {
      mail,
      facebook,
      pl,
      en
    }

    return {
      contact
    }
  }
})
</script>

<style src="./contact.css" scoped/>
