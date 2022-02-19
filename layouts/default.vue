<template>
  <div>
    <Navbar :isLogoVisible="elementsVisible"/>
    <Nuxt/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Index from '~/pages/index.vue'

import { routes } from '~/utils/routes';

export default Vue.extend({
  components: {
    Index
  },
  data() {
    return {
      elementsVisible: false,
      touchStart: 0,
      touchEnd: 0
    }
  },
  methods: {
    startTracking(e) {
      this.touchstartX = e.changedTouches[0].screenX
    },
    endTracking(e) {
      this.touchendX = e.changedTouches[0].screenX
      this.handleGesture()
    },
    handleGesture() {
      const route = this.$route.path;
      const routeIndex = routes.indexOf(route);
      if (this.touchendX > this.touchstartX){
        if(routeIndex > 0)
          this.$router.push({
            path: routes[routeIndex - 1]
          })
      } 
        
      if (this.touchendX < this.touchstartX){
        if(routeIndex < routes.length - 1)
          this.$router.push({
            path: routes[routeIndex + 1]
          })
      }
    }
  },
  mounted() {
    this.elementsVisible = this.$route.path !== '/';
    window.addEventListener('touchstart', e => {
      this.startTracking(e);
    })
    window.addEventListener('touchend', e => {
      this.endTracking(e);
    })
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