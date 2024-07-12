<template>
  <div class="container-cv">
    <div class="container-title">
      <div class="container-illustration">
        <img :src="illustration2" alt="illustration2" />
      </div>
      <h2 class="title">¡My Curriculum Vitae!</h2>
    </div>
    <hr />
    <div class="wrapper-cv">
      <embed zoom="90" class="cv" src="https://drive.google.com/file/d/1JrgENjJKH6ouVq4I1mDJ3YtRH1hzPZ9s/preview" type="application/pdf" />
    </div>
    <a class="download-btn" href="https://drive.google.com/file/d/1JrgENjJKH6ouVq4I1mDJ3YtRH1hzPZ9s/view" target="_blank"> Download it here!</a>
  </div>
</template>

<script>
import illustration2 from '../../../assets/illustrations/illustration2.png'

export default {
  setup(){

    return{
      illustration2,
    }
  }
};
</script>

<style lang="sass">
@import './styles/cv.scss'
</style>
