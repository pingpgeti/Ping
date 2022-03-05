<template>
  <article class="news">
    <header class="news__header">
      {{ title }}
    </header>
    <span class="news__date"> {{ date}} </span>
    <div class="news__content">
      
      <p class="news__text">  
        <img class="news__img" :src="src"/>
        {{ text }}
      </p>
    </div>
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'News',
  props: {
    title: {
      type: String
    },
    date: {
      type: String
    },
    src: {
      type: String
    },
    text: {
      type: String
    }
  }
})
</script>

<style src="./News.css" scoped />