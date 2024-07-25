<template>
  <div class="container-contactMe">
    <div class="container-title">
      <img :src="illustration4" alt="Illustration4" />
      <h2 class="title">Contact me</h2>
    </div>
    <img src="https://i.gifer.com/ZKZg.gif" width="40" alt="Loading..." v-if="loadingForm"/>
    <div class="container-form" v-else>
      <form
        @submit.prevent="onSubmit()"
        class="form-contactMe"
        autocomplete="off"
      >
        <input
          type="text"
          id="nameField"
          name="name"
          placeholder="Name"
          v-model="form.name"
        />
        <input
          type="email"
          id="emailField"
          name="email"
          placeholder="Email"
          v-model="form.email"
        />
        <textarea
          id="msgField"
          name="msg"
          placeholder="Message"
          v-model="form.message"
        />
        <button class="btn-submit" type="submit">Send message!</button>
      </form>
      <div class="container-socials">
        <a :href="`https://wa.me/${state.aboutMe[0]?.phone}`" target="_blank">
          <img :src="iconWpp" alt="Whatsapp" />
        </a>
        <a
          :href="`https://mail.google.com/mail/?view=cm&to=${state.aboutMe[0]?.email}`"
          target="_blank"
        >
          <img :src="iconGml" alt="Gmail" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import illustration4 from "../../../assets/illustrations/illustration4.png";
import iconWpp from "../../../assets/icons/socials/iconWpp.png";
import iconGml from "../../../assets/icons/socials/iconGmail.png";
import { useState } from "../../../utils/globalState";
import { postSendEmail } from "../../../controllers/postSendEmail";
import Swal from "sweetalert2";
import { ref } from "vue";

export default {
  setup() {
    const form = ref({
      name: "",
      email: "",
      message: "",
    });

    const loadingForm = ref(false)

    const state = useState();

    const onSubmit = async () => {
      loadingForm.value = true
      if (form.value.name.length == 0 || form.value.email.length == 0 || form.value.message.length == 0) {
        Swal.fire("There are some blank fields!");
        loadingForm.value = false
      } else {
        state.contactMe = { ...form.value };
        postSendEmail("sendEmail", state, form).then(() => {
          loadingForm.value = false
        })
        
      }
    };

    return {
      loadingForm,
      form,
      state,
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
