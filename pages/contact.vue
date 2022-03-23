<template>
  <div class="contact">
    <div class="contact__info">
      <h1>Napisz do nas</h1>
      <div class="contact__why">
        <div>
          <h3>aby dołączyć do Koła,</h3>
          <h3>aby nawiązać współpracę,</h3>
          <h3>aby lepiej nas poznać.</h3>
        </div>
      </div>
      <div class="contact__forms">
        <h3>mail: ping@eti.pg.edu.pl</h3>
        <h3>facebook: fb.com/pingetipg</h3>
      </div>
    </div>
    <div class="contact__separator"/>
    <div class="contact__where">
      <h3>Tu jesteśmy!</h3>
      <img alt="map" src="/map.png"/>
    </div>
    <Footer/>
  </div> 
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Contact'
})
</script>

<style src="./contact.css" scoped/>
