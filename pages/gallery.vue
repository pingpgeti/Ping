<template>
  <div class="gallery">
    <header class="gallery__info">
      <h1>Galeria. Tu zobaczysz jak działamy</h1>
    </header>
    <div class="gallery__grid">
      <GalleryImage v-for="(image, index) in images" :key="index" :text="image.text" :src="image.src"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import GalleryImage from '~/components/GalleryImage.vue';
export default Vue.extend({
    name: "Gallery",
    data() {
      return {
        images: [
          {
            text: "Zajęcia z bezpieczeństwa API z Maciejem Koflem",
            src: "https://knping.pl/images/kofel_prezentacja4.png"
          },
          {
            text: "Selfie ze spotkania z Maciejem Koflem",
            src: "https://knping.pl/images/kofelselfie3.jpg",
          },
          {
            text: "Ping oraz Maciej Kofel ze szkolasecurity.pl",
            src: "https://knping.pl/images/ping_i_kofel2.png"
          },
          {
            text: "Spotkanie z Maciejem Koflem ze szkolasecurity.pl",
            src: "https://knping.pl/images/IMG_2035.png"
          }
        ]
      };
  },
  components: { GalleryImage }
})
</script>

<style src="./gallery.css" scoped/>