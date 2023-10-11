<script >
import { onMounted, ref } from 'vue';
import Nav from './components/layout/nav/Nav.vue'
import Footer from './components/layout/footer/Footer.vue'
import { RouterView } from 'vue-router'
export default {
  name: 'App',
  components: {
    Nav,
    Footer,
  },
  setup(props) {
    const isSmall = ref(false);

    onMounted(() => {
      window.addEventListener('scroll', () => {
        isSmall.value = window.scrollY > 20;
      })
    })

    return {
      isSmall
    }
  }
}

</script>

<template>
  <div class="main-container">
    <Nav :smallNavbar="isSmall"/>
    <RouterView/>
    <Footer/>
  </div>
</template>

<style scoped>
  .main-container{
    position: relative;
  }
</style>
