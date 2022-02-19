<template>
  <div class="gallery">
    <header class="gallery__info">
      <h1>Galeria. Tu zobaczysz jak działamy</h1>
    </header>
    <div class="gallery__grid">
      <GalleryImage v-for="(image, index) in images"
        :key="index"
        :text="image.text"
        :src="image.src"/>
    </div>
    <Footer/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import GalleryImage from '~/components/GalleryImage.vue';

import GetGalleries from '~/graphql/getGalleries.gql';

import { client } from '~/apollo/client';

export default Vue.extend({
    name: "Gallery",
    components: { GalleryImage },
    data: () => ({
      images: [],
    }),
    async asyncData() {
      const { data } = await client.query({query: GetGalleries});
      const images = data.allGallerys.edges.map(edge => {
        return {
          text: edge.node.title[0].text,
          src: edge.node.images[0].image.url
        }
      });
      return {
        images
      }
    }    
  }
)
</script>

<style src="./gallery.css" scoped/>