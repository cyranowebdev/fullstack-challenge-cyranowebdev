import axios from 'axios';

const localhost = process.env.REACT_APP_HOSTNAME || 'localhost:3001';

const fetchSchool = async (token) => {
  try {
    const headers = { authorization: token.token };

    const request = {
      method: 'get',
      url: `http://${localhost}/school`,
      headers,
    };
    const result = await axios(request);
    console.log('Director get school: ', result);
    return result.data;
  } catch (error) {
    if (error.response) {
      // Request made -> server responded with a status code !== 2xx
      console.log('resp.err: ', error.response.data);
      return error.response.data;
    }
    if (error.request) {
      // Request made -> server NOT responded
      // `error.request` is an instance of XMLHttpRequest in browser
      //  and an instance of http.ClientRequest in node.js
      console.log('req.err: ', error.request);
    } else {
      // Something happened in the setting up of request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  }
};

const fetchClasses = async (token, schoolId) => {
  try {
    const headers = { authorization: token.token };
    const data = { schoolId };

    const request = {
      method: 'post',
      url: `http://${localhost}/school/classes`,
      headers,
      data,
    };
    const result = await axios(request);
    return result.data;
  } catch (error) {
    if (error.response) {
      // Request made -> server responded with a status code !== 2xx
      console.log('resp.err: ', error.response.data);
      return error.response.data;
    }
    if (error.request) {
      // Request made -> server NOT responded
      // `error.request` is an instance of XMLHttpRequest in browser
      //  and an instance of http.ClientRequest in node.js
      console.log('req.err: ', error.request);
    } else {
      // Something happened in the setting up of request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  }
};

const removeClass = async (token, classId) => {
  try {
    const headers = { authorization: token.token };
    const data = { classId };

    const request = {
      method: 'delete',
      url: `http://${localhost}/school/class`,
      headers,
      data,
    };
    const result = await axios(request);
    return result.data;
  } catch (error) {
    if (error.response) {
      // Request made -> server responded with a status code !== 2xx
      console.log('resp.err: ', error.response.data);
      return error.response.data;
    }
    if (error.request) {
      // Request made -> server NOT responded
      // `error.request` is an instance of XMLHttpRequest in browser
      //  and an instance of http.ClientRequest in node.js
      console.log('req.err: ', error.request);
    } else {
      // Something happened in the setting up of request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  }
};

export default {
  fetchSchool,
  fetchClasses,
  removeClass,
};
