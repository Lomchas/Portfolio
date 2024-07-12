    import { reactive } from "vue";


    const globalState = reactive({
        languages: [],
        aboutMe: {},
        projects: [],
        error: null,
        loading: true,
        areaName: [],
    });


    export const useState = () => globalState;