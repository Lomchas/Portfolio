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
      <embed zoom="90" class="cv" src="/assets/docs/cv.pdf" type="application/pdf" />
    </div>
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
