<template>
  <div>
    <Navbar :isLogoVisible="elementsVisible"/>
    <Nuxt/>
    <Footer v-if="elementsVisible"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      elementsVisible: false,
    }
  },
  mounted() {
    this.elementsVisible = this.$route.path !== '/';
  },
  watch: {
    '$route.path'(to, _) {
      this.elementsVisible = to !== '/';
    }
  }
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

* , *::after, *::before {
  box-sizing: border-box;
}

body {
  background: black;
  margin-left: 80px;
  margin-right: 80px;
}

@media screen and (max-width: 769px) {
  body {
    padding-top: 80px;
    margin-left: 16px;
    margin-right: 16px;
  }
}

ul {
  padding-inline-start: 0;
}

</style>