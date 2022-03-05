<template>
  <div class="gallery">
    <header class="gallery__info">
      <h1>Galeria. Tu zobaczysz jak działamy</h1>
    </header>
    <div class="gallery__grid">
      <client-only>
        <LightGallery
          :images="gallery"
          :index="index"
          :disable-scroll="true"
          @close="galleryIndex = null"/>
      </client-only>
      <GalleryImage v-for="(image, index) in images"
        @click.native="galleryClick(index)"
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
      galleryIndex: null
    }),
    async asyncData() {
      const { data } = await client.query({query: GetGalleries});
      const images = data.allGallerys.edges.map(edge => {
        const children = edge.node.images.map(img => img.image.url);
        return {
          text: edge.node.title[0].text,
          src: edge.node.images[0].image.url,
          children
        }
      });
      return {
        images
      }
    },
    computed: {
      index() {
        if(this.gallery.length > 0)
          return 0;
        return null;
      },
      gallery() {
        if(this.images[this.galleryIndex])
          return this.images[this.galleryIndex].children;
        return [];
      }
    },
    methods: {
      galleryClick(index) {
        this.galleryIndex = index;
      }
    }
  }
)
</script>

<style src="./gallery.css" scoped/>