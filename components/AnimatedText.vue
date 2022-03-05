<template>
  <div class="animated-text" v-if="!isAnimationDone">
    <span class="animated-text__content">
      {{ getWord() }}
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    text: {
      type: String,
      required: true,
      default: 'Sample Text'
    },
    milisecondsPerLetter: {
      type: Number,
      required: false,
      default: 100
    },
    textFadeDelay: {
      type: Number,
      required: false,
      default: 300
    },
  },
  data() {
    return {
      letterIterator: 0,
      allLettersLength: 0,
      isAnimationDone: false,
      words: [],
      textInterval: null,
    }
  },
  methods: {
    getWord() {
      if(this.words.length < 1)
        return '';
      let i;
      let counter = 0;
      for(i = 0; i < this.words.length; i++) {
        counter += this.words[i].length;
        if(counter > this.letterIterator)
          break;
      }
      if(i >= this.words.length)
        return this.text;
      return this.words[i].substring(0, this.letterIterator - (counter - this.words[i].length - 1));
    }
  },
  beforeMount() {
    this.words = [this.text];
    this.words.forEach(word => {
      this.allLettersLength += word.length;
    });

    this.textInterval = setInterval(() => {
      this.letterIterator += 1;
      if(this.letterIterator > this.allLettersLength) {
        clearInterval(this.textInterval);
        setTimeout(() => {
          this.isAnimationDone = true;
          this.$emit('finished', true);
        }, this.textFadeDelay)
      }
    }, this.milisecondsPerLetter);
  }
})
</script>

<style src="./AnimatedText.css" scoped/>
