<template>
    <div class="preview">
        <svg class="preview__close" @click="closeGallery" width="65" height="65" viewBox="0 0 65 65" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M48.8752 16.6488L16.8752 48.6489" stroke="white" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            <path d="M16.8752 16.6488L48.8752 48.6489" stroke="white" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
        <div>
            <svg class="preview__arrow" @click="moveGallery(-1)" :class="{'preview__arrow--hidden' : (imageIndex <= 0)}" width="32" height="32"
                viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.3334 16H6.66675" stroke="white" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                <path d="M16.0001 25.3333L6.66675 16L16.0001 6.66666" stroke="white" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </div>
        <img :src="gallery[imageIndex]" />
        <div>
            <svg class="preview__arrow" @click="moveGallery(1)" :class="{'preview__arrow--hidden' : (imageIndex >= gallery.length - 1)}" width="33"
                height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.54565 16.7622H26.2123" stroke="white" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                <path d="M16.8789 7.42884L26.2122 16.7622L16.8789 26.0955" stroke="white" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

export default Vue.extend({
    name: "GalleryPreview",
    props: {
        gallery: {
            type: Array as PropType<string[]>,
            required: true
        }
    },
    data: () => ({
        imageIndex: 0
    }),
    methods: {
        closeGallery() {
            this.imageIndex = 0;
            this.$emit('closeGallery');
        },
        moveGallery(direction) {
            this.imageIndex += direction;
        }
    }
});
</script>



<style scoped src="./GalleryPreview.css"/>

