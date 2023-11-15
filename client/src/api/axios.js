import axios from 'axios'

const port = 4000;
const url = 'http://54.91.42.4';

const instance =  axios.create({
    baseURL:`${url}:${port}/api`,
    withCredentials: true
}, console.log(`using port ${port} as backend port`));

export default instance