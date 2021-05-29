import axios from 'axios';

export default axios.create({
    baseURL:  process.env.NODE_ENV === "production" ? `https://atalia-facebook-api.herokuapp.com` : `http://localhost:7000`,
  });

