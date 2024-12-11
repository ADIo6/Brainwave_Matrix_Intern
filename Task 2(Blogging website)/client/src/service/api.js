import axios from 'axios';

import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config.js';
import { getAccessToken, getType } from '../utils/common-util.js';

// const API_URL = 'http://localhost:8000'; development phase
// const API_URL = 'https://your-backend-service.onrender.com'; //instead of hard coding like this do the below 
const API_URL = process.env.REACT_APP_API_URL;



const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Accept":"application/json, multipart/form-data", //^^
        "Content-Type": "application/json"
    }

});

axiosInstance.interceptors.request.use(
    function (config){
        console.log("Request Config:", config); // Log full config //^^
        if(config.TYPE.params){
            config.params = config.TYPE.params;
        } else if(config.TYPE.query){
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function (error){
        console.error("Request Error:", error); //^^
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function (response){
        // Stop global loader here
        return processResponse(response);
    },
    function(error){

        return Promise.reject(processError(error));
    }
)

////////////////////////////////////////////////////////////
//If success -> return {isSuccess: true, data:object}
//If fail -> return {isFailure: true, status: string, msg: string, code: int}
///////////////////////////////////////////////////////////

const processResponse = (response) => {
    if (response?.status === 200 || response?.status === 201) {
        return { isSuccess: true, data: response.data };
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg || 'Unexpected response',
            code: response?.code || response?.status,
        };
    }
};



const processError = (error) =>{
    if(error.response){
        //Request made and server responded with a status other
        // that falls out of the range 2.x.x
        console.log('Error in response: ', error.toJSON());
        return{
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        }
    }else if(error.request){
        // Request made but no response was received(problem with connection of f-end & b-end)
        console.log('Error in request : ', error.toJSON());
        return{
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        }
    }else{
        //Something happened in setting up request that triggers an errors
        console.log('Error in Network : ', error.toJSON());
        return{
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        }
    }
}

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    // console.log(`Key: ${key}, Method: ${value.method}, URL: ${value.url}`);
    API[key]= (body, showUploadProgress, showDownloadProgress) =>{

         return axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? {} : body,
            responseType: value.responseType,
            headers:{
                authorization: getAccessToken()
            },
            TYPE: getType(value, body),
            onUploadProgress: function (progressEvent) {
                if(showUploadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100 ) / progressEvent.total);
                    showUploadProgress(percentageCompleted);

                }      
            },
            onDownloadProgress: function (progressEvent) {
                if(showDownloadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100 ) / progressEvent.total);
                    showDownloadProgress(percentageCompleted);

                }
            }    
        }) 
    }
}

export { API };
