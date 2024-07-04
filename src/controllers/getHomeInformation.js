import axiosInstance from "../plugins/axios.js";


export const getHomeInformation = async (route, state) => {
    try {
      const response = await axiosInstance.get(route);

      // GETTING DATA FROM API----!!
      const data = response.data[0];
      state.value.languages = data;
      // console.log(state.value.languages);
      // console.log(data);

      // GETTING SKILLS TITLE
      const arrayKeys = Object.keys(state.value.languages);
      const [_, ...arrayKeysSinPrimero] = arrayKeys;
      state.value.areaName = arrayKeysSinPrimero;
      // console.log(state.value.areaName)

      // CATCHING ERRORS
    } catch (err) {
      state.value.error = `An error has occurred: ${err}`;
      console.error(err);

      // CHANGING LOADING STATE
    } finally {
      setTimeout(() => {
        state.value.loading = false;
      }, 500);
    }
  };