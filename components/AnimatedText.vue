<template>
  <div class="animated-text" v-if="!isAnimationDone">
    <span class="animated-text__content">
      {{ getWord() }}
      <span :style="{ opacity: pointerIteration % 2 }" class="animated-text__pointer">|</span>
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
      default: 175
    },
    textFadeDelay: {
      type: Number,
      required: false,
      default: 1000
    },
    pointerTick: {
      type: Number,
      required: false,
      default: 300
    }
  },
  data() {
    return {
      letterIterator: 0,
      pointerIteration: 0,
      allLettersLength: 0,
      isAnimationDone: false,
      words: [],
      textInterval: null,
      pointerInterval: null
    }
  },
  methods: {
    getWord() {
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

    this.pointerInterval = setInterval(() => {
      this.pointerIteration += 1;
      if(this.isAnimationDone)
        clearInterval(this.pointerInterval);
    }, this.pointerTick)
  }
})
</script>

<style src="./AnimatedText.css" scoped/>
