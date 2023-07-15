<template>
  <div class="container-contactMe">
    <div class="container-title">
      <img :src="illustration4" alt="Illustration4" />
      <h2 class="title">Contact | me</h2>
    </div>
    <div class="container-form">
      <form @submit.prevent="onSubmit()" class="form-contactMe">
        <input type="text" id="nameField" name="name" placeholder="Name" />
        <input type="email" id="emailField" name="email" placeholder="Email" />
        <textarea id="msgField" name="msg" placeholder="Message" />
        <button class="btn-submit" type="submit">Send message!</button>
      </form>
      <div class="container-socials">
        <a href="https://wa.me/+573225227473" target="_blank">
          <img :src="iconWpp" alt="Whatsapp">
        </a>
        <a href="https://mail.google.com/mail/?view=cm&to=daniellosada17@gmail.com" target="_blank">
          <img :src="iconGml" alt="Gmail">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import illustration4 from '../../../assets/illustrations/illustration4.png'
import iconWpp from '../../../assets/icons/socials/iconWpp.png'
import iconGml from '../../../assets/icons/socials/iconGmail.png'

export default {
  setup() {
    const onSubmit = () => {};
    return {
      illustration4,
      iconWpp,
      iconGml,
      onSubmit,
    };
  },
};
</script>

<style lang="sass">
@import './styles/contactMe.scss'
</style>
