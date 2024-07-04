<template>
  <div class="container-home">
    <div class="container-greeting" v-if="!state.loading">
      <div class="container-illustration">
        <a href="https://www.linkedin.com/in/daniel-losada17/" target="_blank">
          <img :src="picture" alt="Yo" />
        </a>
      </div>
      <div class="container-skills">
        <div class="skill" v-for="(area, i) in state.areaName" :key="i">
          <h2 class="title">{{ area }} skills</h2>
          <hr width="100%" />
          <div class="container-skill-item">
            <!-- <button class="scroll-button prev">◄</button> -->
            <div class="skills-wrapper">
              <div
                class="skill-item"
                v-for="(l, index) in state.languages[area]"
                :key="index"
              >
                <img width="40" :src="l.img" alt="logo" />
                <span>{{ l.name }}</span>
                <Progress
                  :percentProgress="l.percent"
                  :colorProgress="l.color"
                />
              </div>
            </div>
            <!-- <button class="scroll-button next">►</button> -->
          </div>
        </div>
      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<script>
import picture from "../../../assets/profile.png";
import Progress from "../../layout/progress-bar/Progress.vue";
import Loading from "../../../components/layout/loading/Loading.vue";
import { ref, reactive, computed, onMounted } from "vue";
import { getHomeInformation } from "../../../controllers/getHomeInformation";

export default {
  name: "Home",
  components: {
    Progress,
    Loading,
  },
  setup(props) {
    // const languages = reactive({
    //   Frontend: [
    //     {
    //       name: "VueJs",
    //       img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/2367px-Vue.js_Logo_2.svg.png",
    //       percent: 88,
    //       color: "#41B883",
    //     },
    //     {
    //       name: "ReactJs",
    //       img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png",
    //       percent: 75,
    //       color: "#61DBFB",
    //     },
    //     {
    //       name: "SCSS",
    //       img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sass_Logo_Color.svg/512px-Sass_Logo_Color.svg.png",
    //       percent: 70,
    //       color: "#CA6496",
    //     },
    //     {
    //       name: "JavaScript",
    //       img: "https://logospng.org/download/javascript/logo-javascript-icon-1024.png",
    //       percent: 90,
    //       color: "#CBB130",
    //     },
    //     {
    //       name: "Bootstrap",
    //       img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/2560px-Bootstrap_logo.svg.png",
    //       percent: 64,
    //       color: "#563F7B",
    //     },
    //   ],
    //   Backend: [
    //     {
    //       name: "NodeJs",
    //       img: "https://static-00.iconduck.com/assets.00/node-js-icon-1901x2048-mk1e13df.png",
    //       percent: 68,
    //       color: "#6DA75D",
    //     },
    //     {
    //       name: "Express",
    //       img: "https://images.credly.com/size/340x340/images/1c2c86e1-16ce-4e4d-a425-d1ac96bb026d/express.png",
    //       percent: 76,
    //       color: "#868D94",
    //     },
    //     {
    //       name: "C#",
    //       img: "https://cdn.cdnlogo.com/logos/c/68/c-sharp-800x800.png",
    //       percent: 45,
    //       color: "#9A4993",
    //     },
    //     {
    //       name: "MySQL",
    //       img: "https://www.freepnglogos.com/uploads/logo-mysql-png/logo-mysql-mysql-logo-png-images-are-download-crazypng-21.png",
    //       percent: 80,
    //       color: "#CE8B2C",
    //     },
    //     {
    //       name: "SQL",
    //       img: "https://user-images.githubusercontent.com/4249331/52232852-e2c4f780-28bd-11e9-835d-1e3cf3e43888.png",
    //       percent: 55,
    //       color: "#C03040",
    //     },
    //     {
    //       name: "Rest-API",
    //       img: "https://icon-library.com/images/rest-api-icon/rest-api-icon-8.jpg",
    //       percent: 80,
    //       color: "#00935B",
    //     },
    //   ],
    //   Plus: [
    //     {
    //       name: "GitHub",
    //       img: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
    //       percent: 90,
    //       color: "#202124",
    //     },
    //     {
    //       name: "GoogleCloud",
    //       img: "https://static-00.iconduck.com/assets.00/google-cloud-platform-icon-1024x823-mrdn81d1.png",
    //       percent: 35,
    //       color: "#FBBC05",
    //     },
    //     {
    //       name: "Railway",
    //       img: "https://railway.app/brand/logo-dark.svg",
    //       percent: 40,
    //       color: "black",
    //     },
    //     {
    //       name: "Azure",
    //       img: "https://seeklogo.com/images/M/microsoft-azure-logo-85055C44BE-seeklogo.com.png",
    //       percent: 30,
    //       color: "#0089D6",
    //     },
    //     {
    //       name: "Bitbucket",
    //       img: "https://static-00.iconduck.com/assets.00/bitbucket-icon-512x512-exmgeb8n.png",
    //       percent: 70,
    //       color: "#0051CD",
    //     },
    //     {
    //       name: "Canva",
    //       img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Canva_icon_2021.svg/2048px-Canva_icon_2021.svg.png",
    //       percent: 80,
    //       color: "#5F4DE2",
    //     },
    //     {
    //       name: "Ps",
    //       img: "https://logodownload.org/wp-content/uploads/2019/10/adobe-photoshop-logo.png",
    //       percent: 40,
    //       color: "#001E36",
    //     },
    //   ],
    // });

    const state = ref({
      languages: [],
      error: null,
      loading: true,
      areaName: [],
    });

    

    onMounted(() => {
      // PUTTING FUNCTION INTO ONMOUNTED FUNCTION
      getHomeInformation("/experiences", state);
    });

    return {
      getHomeInformation,
      picture,
      // languages,
      state,
    };
  },
};
</script>

<style lang="sass">
@import './styles/home.scss'
</style>
