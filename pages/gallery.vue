<template>
  <div class="gallery">
    <header class="gallery__info">
      <h1>{{ translatedTitle }}</h1>
    </header>
    <client-only>
      <div v-if="galleryIndex !== null" class="preview">
        <svg class="preview__close" @click="closeGallery" width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M48.8752 16.6488L16.8752 48.6489" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.8752 16.6488L48.8752 48.6489" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


        <div>
          <svg class="preview__arrow" @click="moveGallery(-1)" v-if="imageIndex > 0" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.3334 16H6.66675" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.0001 25.3333L6.66675 16L16.0001 6.66666" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg></div>

        <img :src="gallery[imageIndex]"/>
        <div>
          <svg class="preview__arrow" @click="moveGallery(1)" v-if="imageIndex < gallery.length - 1" width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.54565 16.7622H26.2123" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.8789 7.42884L26.2122 16.7622L16.8789 26.0955" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      </div>
      </div>
    </client-only>
    <div class="gallery__grid">
      <GalleryImage v-for="(image, gIndex) in translatedImages"
        @click.native="galleryClick(gIndex)"
        :key="gIndex"
        :text="image.label"
        :src="image.src"/>
    </div>
    <Footer/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import GalleryImage from '~/components/GalleryImage.vue';

import GetGalleries from '~/graphql/getGalleries.gql';
import getGalleryPage from '~/graphql/getGalleryPage.gql';

import { client } from '~/apollo/client';
import { mapGetters, mapMutations } from 'vuex';

export default Vue.extend({
    name: "Gallery",
    components: { GalleryImage },
    data: () => ({
      title: {},
      images: [],
      galleryIndex: null,
      imageIndex: 0
    }),
    async asyncData() {
      const { data: titleData } = await client.query({query: getGalleryPage});
      const title = {
        pl: titleData.allGallerypages.edges[0].node.pl[0].text,
        en: titleData.allGallerypages.edges[0].node.en[0].text,
      }

      const { data } = await client.query({query: GetGalleries});
      const images = data.allGallerys.edges.map(edge => {
        const children = edge.node.images.map(img => img.image.url);
        return {
          pl: edge.node.pl[0].text,
          en: edge.node.en[0].text,
          src: edge.node.images[0].image.url,
          children
        }
      });

      return {
        title,
        images
      }
    },
    computed: {
      ...mapGetters([
        'lang'
      ]),
      gallery() {
        if(this.images[this.galleryIndex])
          return this.images[this.galleryIndex].children;
        return [];
      },
      translatedImages() {
        return this.images.map(x => ({
          src: x.src,
          children : x.children,
          label: x[this.lang.substring(0,2)]
        }));
      },
      translatedTitle() {
        return this.title[this.lang.substring(0,2)]
      }
    },
    methods: {
      galleryClick(index) {
        console.log(this.image);
        this.imageIndex = 0;
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
      ]),
      moveGallery(direction) {
        this.imageIndex += direction;
      }
    }
  }
)
</script>

<style src="./gallery.css" scoped/>
