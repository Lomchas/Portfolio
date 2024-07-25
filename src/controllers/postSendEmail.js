import Swal from "sweetalert2"
import axiosInstance from "../plugins/axios"

export const postSendEmail = async (route, state, form) => {
    try {
        const response = await axiosInstance.post(route, state?.contactMe)
        console.log(response.data)
        Swal.fire({
            title: 'Perfect',
            text: response.data?.message,
            icon: 'success',
            background: '#242424',
            color: '#f0f0f0',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Alright'
        })
        form.value = {
            name: '',
            email: '',
            message: ''
        };
    }
    catch (err) {
        state.error = `An error has occurred, Email was not sent: ${err}`
        console.error(state.error)
    }
    finally {
        state.loading = false

    }
}