import axios from "axios";

export default axios.create({
    baseURL: 'http://react-laravel-crude.test/api',
})