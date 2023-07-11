<template>
  <div class="container-home">
    <div class="container-greeting">
      <div class="container-illustration">
        <a href="https://www.linkedin.com/in/daniel-losada17/" target="_blank">
          <img :src="picture" alt="Yo" />
        </a> 
      </div>
      <div class="container-skills">
        <div class="skill" v-for="(area, i) in areaName" :key="i">
          <h2 class="title">{{area}} skills</h2>
          <hr width="100%">
          <div  class="container-skill-item">
            <!-- <button class="scroll-button prev">◄</button> -->
            <div class="skills-wrapper">
              <div class="skill-item" v-for="l in languages[area]">
                <img width="40" :src="l.img" alt="logo" />
                <span>{{ l.name }}</span>
                <Progress :percentProgress="l.percent" :colorProgress="l.color" />
              </div>
            </div>
            <!-- <button class="scroll-button next">►</button> -->
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import picture from "../../../assets/profile.png";
import Progress from "../../layout/progress-bar/Progress.vue";
import { ref, reactive, computed } from "vue";

export default {
  name: "Home",
  components: {
    Progress,
  },
  setup(props) {
    const languages = reactive({
      Frontend: [
        {
          name: "VueJs",
          img:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/2367px-Vue.js_Logo_2.svg.png",
          percent: 88,
          color: "#41B883",
        },
        {
          name: "ReactJs",
          img:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png",
          percent: 75,
          color: "#61DBFB",
        },
        {
          name: "SCSS",
          img: "https://sass-lang.com/assets/img/styleguide/seal-color-aef0354c.png",
          percent: 70,
          color: "#CA6496",
        },
        {
          name: "JavaScript",
          img: "https://logospng.org/download/javascript/logo-javascript-icon-1024.png",
          percent: 90,
          color: "#CBB130",
        },
        {
          name: "Bootstrap",
          img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/2560px-Bootstrap_logo.svg.png",
          percent: 64,
          color: "#563F7B",
        },
        
      ],
      Backend: [
        {
          name: "NodeJs",
          img:
            "https://static-00.iconduck.com/assets.00/node-js-icon-1901x2048-mk1e13df.png",
          percent: 68,
          color: "#6DA75D",
        },
        {
          name: "Express",
          img: "https://camo.githubusercontent.com/9270fc40ed052b4158b76122cc9984c9c9670b717577d3e89497629fc25782e7/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f7468756d622f382f38382f5374617475735f6975636e5f45585f69636f6e2e7376672f34383070782d5374617475735f6975636e5f45585f69636f6e2e7376672e706e67",
          percent: 76,
          color: "#868D94",
        },
        {
          name: "C#",
          img: "https://cdn.cdnlogo.com/logos/c/68/c-sharp-800x800.png",
          percent: 45,
          color: "#9A4993",
        },
        {
          name: "MySQL",
          img: "https://www.freepnglogos.com/uploads/logo-mysql-png/logo-mysql-mysql-logo-png-images-are-download-crazypng-21.png",
          percent: 80,
          color: "#CE8B2C",
        },
        {
          name: "SQL",
          img: "https://user-images.githubusercontent.com/4249331/52232852-e2c4f780-28bd-11e9-835d-1e3cf3e43888.png",
          percent: 55,
          color: "#C03040",
        },
        {
          name: "Rest-API",
          img: "https://icon-library.com/images/rest-api-icon/rest-api-icon-8.jpg",
          percent: 80,
          color: "#00935B",
        },
        
      ],
      Plus: [
        {
          name: "GitHub",
          img: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
          percent: 90,
          color: "#202124",
        },
        {
          name: "GoogleCloud",
          img: "https://static-00.iconduck.com/assets.00/google-cloud-platform-icon-1024x823-mrdn81d1.png",
          percent: 35,
          color: "#FBBC05",
        },
        {
          name: "Railway",
          img: "https://railway.app/brand/logo-dark.svg",
          percent: 40,
          color: "black",
        },
        {
          name: "Azure",
          img: "https://seeklogo.com/images/M/microsoft-azure-logo-85055C44BE-seeklogo.com.png",
          percent: 30,
          color: "#0089D6",
        },
        {
          name: "Bitbucket",
          img: "https://static-00.iconduck.com/assets.00/bitbucket-icon-512x512-exmgeb8n.png",
          percent: 70,
          color: "#0051CD",
        },
        {
          name: "Canva",
          img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Canva_icon_2021.svg/2048px-Canva_icon_2021.svg.png",
          percent: 80,
          color: "#5F4DE2",
        },
        {
          name: "Ps",
          img: "https://logodownload.org/wp-content/uploads/2019/10/adobe-photoshop-logo.png",
          percent: 40,
          color: "#001E36",
        },
      ],
    });
    const areaName = computed(() => Object.keys(languages))


    return {
      areaName,
      picture,
      languages,
    };
  },
};
</script>

<style lang="sass">
@import './styles/home.scss'
</style>
