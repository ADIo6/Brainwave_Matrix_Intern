// API notifications messages

export const API_NOTIFICATION_MESSAGES = {
    loading:{
        title: 'loading...',
        message: 'Data is beign loaded, Please wait'
    },
    success:{
        title:'success',
        message:'Data successfully loaded'
    },
    responseFailure:{
        title:'Error',
        message:'an error occured while fetching response form the server. Please try again',

    },
    requestFailure:{
        title:'Error',
        message: 'An error occurred while parsing request data'
    },
    networkError:{
        title:'error',
        message:'Unable to connect with the server. Please check internet connectivity and try again later',
    }
}

// API service call

// SAMPLE REQUEST
// NEED SERVICE CALL: { url:'/', method:'POST/GET/PUT/DELETE' params: true/false, query: true/false }
export const SERVICE_URLS = {
    userSignup: { method: 'POST', url: '/signup', responseType: 'json' }, //^^
    userLogin: { method: 'POST', url: '/login', responseType: 'json'},
    uploadFile: { method: 'POST', url: '/file/upload',  responseType: 'json' },
    createPost: { method: 'POST', url: 'create'},
    getAllPosts: { method: 'GET', url: '/posts', params: true},
    getPostById: { method: 'GET', url: 'post', query: true },
    updatePost: { method: 'PUT', url: 'update', query: true },
    deletePost: { method: 'DELETE', url: 'delete', query: true},
    newComment: { method: 'POST', url: '/comment/new' },
    getAllComments: { method:'GET', url: 'comments', query: true },
    deleteComment: { method:'DELETE', url: 'comment/delete', query: true}
};