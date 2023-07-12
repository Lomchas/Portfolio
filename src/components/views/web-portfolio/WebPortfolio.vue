<template>
  <div class="container-webPortfolio">
    <div class="container-title">
      <img :src="illustration3" alt="illustration3">
      <h2 class="title">Portfolio</h2>
      <div class="nav-projects">
        <button :class="{'active': type_frontend }" class="btn-kindOfProject" @click="change_type(true)">Frontend</button>
        <button :class="{'active': !type_frontend }" class="btn-kindOfProject" @click="change_type(false)">Backend</button>
      </div>
    </div>
    <hr />
    <div class="container-projects">
      <div class="wrapper-projects">
        <div class="project" v-if="type_frontend" v-for="(project, i) in projects.frontend_projects" :key="i">
          <div class="info">
            <h3 class="name">{{ project.name }}</h3>
            <p class="desc">{{ project.description }}</p>
            <div class="wrapper-src">
              <a :href="project.url_repository" target="_blank" class="btn-go go_repository">Open repository! 💻</a>
              <a :href="project.url_deploy" target="_blank" class="btn-go go_deploy">Open deploy! 🚀</a>
            </div>
          </div>
          <div class="wrapper-illustration">
            <img :src="project.img" alt="project-img" />
          </div>
        </div>
        <div class="project" v-else-if="!type_frontend" v-for="(project, i2) in projects.backend_projects" :key="i2">
          <div class="info">
            <h3 class="name">{{ project.name }}</h3>
            <p class="desc">{{ project.description }}</p>
            <div class="wrapper-src">
              <a :href="project.url_repository" target="_blank" class="btn-go go_repository">Open repository! 💻</a>
              <a :href="project.url_deploy" target="_blank" class="btn-go go_deploy">Open deploy! 🚀</a>
            </div>
          </div>
          <div class="wrapper-illustration">
            <img :src="project.img" alt="project-img" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import illustration3 from '../../../assets/illustrations/illustration3.png'

export default {
  setup() {
    const type_frontend = ref(false);
    const projects = reactive({
      frontend_projects: [
        {
          name: "E Commerce App",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum magni, laboriosam ex dicta saepe architecto nemo modi! Pariatur quae dicta et saepe nesciunt corrupti nihil ullam, sapiente dolore tenetur veniam hic error minus? Odio voluptatibus sed  mollitia ratione, similique facilis officiis eveniet, quisquam doloribus rerum temporibus delectus magnam cumque autem!",
          url_repository: "https://co.pinterest.com/pin/662169951482244622/",
          url_deploy: "https://co.pinterest.com/pin/662169951482244622/",
          img:
            "https://img.freepik.com/psd-gratis/portada-facebook-marketing-digital-plantilla-banner-web_237398-409.jpg",
        },
        {
          name: "E Commerce App",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum magni, laboriosam ex dicta saepe architecto nemo modi! Pariatur quae dicta et saepe nesciunt corrupti nihil ullam, sapiente dolore tenetur veniam hic error minus? Odio voluptatibus sed  mollitia ratione, similique facilis officiis eveniet, quisquam doloribus rerum temporibus delectus magnam cumque autem!",
          url_repository: "https://co.pinterest.com/pin/662169951482244622/",
          url_deploy: "https://co.pinterest.com/pin/662169951482244622/",
          img:
            "https://img.freepik.com/psd-gratis/portada-facebook-marketing-digital-plantilla-banner-web_237398-409.jpg",
        },
        {
          name: "E Commerce App",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum magni, laboriosam ex dicta saepe architecto nemo modi! Pariatur quae dicta et saepe nesciunt corrupti nihil ullam, sapiente dolore tenetur veniam hic error minus? Odio voluptatibus sed  mollitia ratione, similique facilis officiis eveniet, quisquam doloribus rerum temporibus delectus magnam cumque autem!",
          url_repository: "https://co.pinterest.com/pin/662169951482244622/",
          url_deploy: "https://co.pinterest.com/pin/662169951482244622/",
          img:
            "https://img.freepik.com/psd-gratis/portada-facebook-marketing-digital-plantilla-banner-web_237398-409.jpg",
        },
        // {
        //   name: "",
        //   description: "",
        //   url_repository: "",
        //   url_deploy: "",
        //   img: "",
        // },
      ],
      backend_projects: [
        {
          name: "E Commerce App",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum magni, laboriosam ex dicta saepe architecto nemo modi! Pariatur quae dicta et saepe nesciunt corrupti nihil ullam, sapiente dolore tenetur veniam hic error minus? Odio voluptatibus sed  mollitia ratione, similique facilis officiis eveniet, quisquam doloribus rerum temporibus delectus magnam cumque autem!",
          url_repository: "https://co.pinterest.com/pin/662169951482244622/",
          url_deploy: "https://co.pinterest.com/pin/662169951482244622/",
          img:
            "https://img.freepik.com/psd-gratis/portada-facebook-marketing-digital-plantilla-banner-web_237398-409.jpg",
        },
      ],
    });

    const change_type = (isFrontend) => {
      if(isFrontend && type_frontend){
        type_frontend.value = true
      }
      else if(!isFrontend && !type_frontend){
        type_frontend.value = false
      }
      else if(isFrontend && !type_frontend){
        type_frontend.value = true
      }
      else if(!isFrontend && type_frontend){
        type_frontend.value = false
      }
    }

    return {
      projects,
      type_frontend,
      change_type,
      illustration3,
    };
  },
};
</script>

<style lang="sass">
@import './styles/webPortfolio.scss'
</style>
