import axios from 'axios'

const instance =  axios.create({
    baseURL:'http://54.91.42.4:4000/api',
    withCredentials: true
});

export default instance