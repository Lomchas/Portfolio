import axiosInstance from "../plugins/axios.js";

export const getHomeInformation = async (route, state) => {
  try {
    const response = await axiosInstance.get(route);

    // GETTING DATA FROM API----!!
    const data = response.data[0];
    state.languages = data;

    // GETTING SKILLS TITLE
    const arrayKeys = Object.keys(state.languages);
    const [_, ...arrayKeysSinPrimero] = arrayKeys;
    state.areaName = arrayKeysSinPrimero;

    // CATCHING ERRORS
  } catch (err) {
    state.error = `An error has occurred: ${err}`;
    console.error(err);

    // CHANGING LOADING STATE
  } finally {
    state.loading = false;
  }
};