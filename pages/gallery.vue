<template>
  <div class="gallery">
    <header class="gallery__info">
      <h1>Galeria - tu zobaczysz jak działamy</h1>
    </header>
    <client-only>
        <LightGallery
          :images="gallery"
          :index="galleryIndex"
          :disable-scroll="true"
          @close="closeGallery"/>
    </client-only>
    <div class="gallery__grid">
      <GalleryImage v-for="(image, gIndex) in images"
        @click.native="galleryClick(gIndex)"
        :key="gIndex"
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
import { mapMutations } from 'vuex';

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
      gallery() {
        if(this.images[this.galleryIndex])
          return this.images[this.galleryIndex].children;
        return [];
      }
    },
    methods: {
      galleryClick(index) {
        this.galleryIndex = index;
        this.lock();
      },
      closeGallery() {
        this.galleryIndex = null;
        this.unlock();
      },
      ...mapMutations([
        'lock',
        'unlock'
      ])
    }
  }
)
</script>

<style src="./gallery.css" scoped/>