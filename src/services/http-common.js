import axios from 'axios';

export default axios.create({
    baseURL: "https://crud-nestjs-flavio.herokuapp.com",
    headers: {
        "Content-type": "application/json"
    }
});
