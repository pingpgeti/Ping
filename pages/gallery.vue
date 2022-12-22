<template>
  <div class="gallery">
    <header class="gallery__info">
      <h1>{{ translatedTitle }}</h1>
    </header>
    <client-only>
      <GalleryPreview v-if="galleryIndex !== null" :gallery="gallery" @closeGallery="closeGallery"/>
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
import GalleryPreview from '~/components/GalleryPreview.vue';

import GetGalleries from '~/graphql/getGalleries.gql';
import getGalleryPage from '~/graphql/getGalleryPage.gql';

import { client } from '~/apollo/client';
import { mapGetters, mapMutations } from 'vuex';

export default Vue.extend({
    name: "Gallery",
    components: { GalleryImage, GalleryPreview },
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
