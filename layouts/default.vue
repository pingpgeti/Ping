<template>
  <div>
    <Navbar :isLogoVisible="elementsVisible"/>
    <Nuxt/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { routes } from '~/utils/routes';
import { mapGetters } from 'vuex';

export default Vue.extend({
  data() {
    return {
      elementsVisible: false,
      touchStartX: 0,
      touchEndX: 0,
      sensitivity: 100
    }
  },
  computed: {
    ...mapGetters([
      'swipingLocked'
    ])
  },
  methods: {
    startTracking(e) {
      this.touchStartX = e.changedTouches[0].screenX;
    },
    endTracking(e) {
      this.touchEndX = e.changedTouches[0].screenX;
      if(!this.swipingLocked)
        this.handleGesture();
    },
    handleGesture() {
      const route = this.$route.path;
      const routeIndex = routes.indexOf(route);
      const sense = Math.abs(this.touchEndX - this.touchStartX);
      if (this.touchEndX > this.touchStartX){
        if(routeIndex > 0 && sense > this.sensitivity)
          this.$router.push({
            path: routes[routeIndex - 1]
          })
      } 
        
      if (this.touchEndX < this.touchStartX){
        if(routeIndex < routes.length - 1 && sense > this.sensitivity)
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