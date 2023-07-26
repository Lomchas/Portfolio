<template>
  <div class="container-aboutMe">
    <div class="wrapper-aboutMe">
      <div class="container-illustration">
        <img :src="illustration1" alt="illustration" />
      </div>
      <div class="container-info">
        <h2 class="title">¡About Me!</h2>
        <hr />
        <p class="info">
          Hey there! I'm Daniel Losada, a tech and innovation enthusiast born in Cali,
          Colombia. My mind works in grids, making problem-solving a creative breeze. Web
          design and layout are my jam, but I also rock the backend scene. Every year, I'm
          all about leveling up my game, aiming to be a whiz in cybersecurity or data
          science. When I'm not deep into the digital realm, you'll find me chillin' in
          rural spots, vibing with nature and showing mad love to animals. I'm a total
          social butterfly, living for the diversity of people and experiences. Oh, and
          you'll never catch me without a cap on my head—it's like an essential part of my
          style! Flexibility is my superpower—both in my fingers and adapting to
          challenges with a calm, analytical mindset. I call myself a "knowledge vacuum"
          'cause I'm always thirsty for learning and evolving in programming. My dream is
          to make tech safer and more efficient for everyone. Excited about the future and
          all the rad opportunities coming my way! Thanks for stopping by my portfolio.
          Let's team up on some mind-blowing projects, shall we? Cheers!
        </p>
        <div class="container-btns">
          <router-link to="/contact-me">Hire Me!</router-link>
          <router-link to="/cv">Check out my dope CV, buddy!</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import illustration1 from "../../../assets/illustrations/illustration1.png";

export default {
  setup() {
    return {
      illustration1,
    };
  },
};
</script>

<style lang="sass">
@import './styles/aboutMe.scss'
</style>
