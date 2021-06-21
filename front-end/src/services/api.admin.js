import axios from 'axios';

const localhost = process.env.REACT_APP_HOSTNAME || 'localhost:3001';

const getDirectors = async (payload) => {
  try {
    const headers = { authorization: payload.token };

    const request = {
      method: 'get',
      url: `http://${localhost}/admin/users/director`,
      headers,
    };

    const result = await axios(request);
    console.log('Admin getDirectors: ', result);
    result.data.unshift({
      name: 'Escolha um diretor disponível', email: '', id: '1' });
    return result.data;
  } catch (error) {
    if (error.response) {
      // Request made -> server responded with a status code !== 2xx
      console.log(error.response.data);
      return error.response.data;
    }
    if (error.request) {
      // Request made -> server NOT responded
      // `error.request` is an instance of XMLHttpRequest in browser
      //  and an instance of http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in the setting up of request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  }
};

const fetchSchools = async (payload) => {
  try {
    const headers = { authorization: payload.token };

    const request = {
      method: 'get',
      url: `http://${localhost}/admin/schools`,
      headers,
    };

    const result = await axios(request);
    console.log('Admin get schools: ', result);
    return result.data;
  } catch (error) {
    if (error.response) {
      // Request made -> server responded with a status code !== 2xx
      console.log(error.response.data);
      return error.response.data;
    }
    if (error.request) {
      // Request made -> server NOT responded
      // `error.request` is an instance of XMLHttpRequest in browser
      //  and an instance of http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in the setting up of request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  }
};

const saveSchool = async (token, payload) => {
  try {
    const headers = { authorization: token.token };
    const data = payload;

    const request = {
      method: 'post',
      url: `http://${localhost}/admin/schools/create`,
      headers,
      data,
    };

    const result = await axios(request);
    console.log('Admin save school: ', data);
    return result.data;
  } catch (error) {
    if (error.response) {
      // Request made -> server responded with a status code !== 2xx
      console.log(error.response.data);
      return error.response.data;
    }
    if (error.request) {
      // Request made -> server NOT responded
      // `error.request` is an instance of XMLHttpRequest in browser
      //  and an instance of http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in the setting up of request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  }
};

export default {
  getDirectors,
  fetchSchools,
  saveSchool,
};
