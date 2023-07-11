<template>
  <div class="container-aboutMe">
    <div class="wrapper-aboutMe">
      <div class="container-illustration">
        <img :src="illustration1" alt="illustration">
      </div>
      <div class="container-info">
        <h2 class="title">¡About Me!</h2>
        <hr />
        <p class="info">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur laboriosam
          exercitationem saepe necessitatibus dolorum! A, quos eum. Exercitationem velit
          ipsam, est animi ipsa doloribus nam voluptates repellendus culpa nobis itaque
          rerum harum quod delectus maxime dignissimos perferendis omnis vel neque ullam
          dolor earum at consequuntur asperiores! Deserunt, doloremque? Autem minima
          placeat consequuntur assumenda dolorum odit cupiditate minus. Temporibus
          veritatis inventore quod nemo eius. Pariatur facilis voluptas impedit, fugiat
          non magnam commodi nihil et est nisi maiores nemo tempora quibusdam sit
          accusamus corrupti sapiente voluptate reiciendis, porro libero accusantium esse
          adipisci. Odio cumque culpa, quia incidunt non eius quidem? Ea, mollitia!
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
import illustration1 from '../../../assets/illustrations/illustration1.png'

export default {
  setup(){


    return{
      illustration1,
    }
  }
}

</script>

<style lang="sass">
@import './styles/aboutMe.scss'
</style>
