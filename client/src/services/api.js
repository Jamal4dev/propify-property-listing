import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL;


if (!API_URL) {

    throw new Error(
        "VITE_API_URL is missing. Check your environment variables."
    );

}



const api = axios.create({

    baseURL: API_URL,

    headers: {

        "Content-Type": "application/json"

    }

});





// Global API error handler

api.interceptors.response.use(

    (response) => {

        return response;

    },


    (error) => {


        if (error.response) {


            return Promise.reject(

                error.response.data

            );


        }



        if (error.request) {


            return Promise.reject({

                message:
                "Unable to connect to server. Please check your internet connection."

            });


        }



        return Promise.reject({

            message:
            error.message

        });


    }

);



export default api;