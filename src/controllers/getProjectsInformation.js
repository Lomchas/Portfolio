import axiosInstance from "../plugins/axios"

export const getProjectsInformation = async (route, state) => {
    try{
        const response = await axiosInstance.get(route);
        state.projects = response.data;
    }
    catch(err){
        state.error = `An error has occurred: ${err}`;
        console.log(err);
    }
    finally{
        state.loading = false;
    }
}