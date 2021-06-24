import axios from 'axios';

const localhost = process.env.REACT_APP_HOSTNAME || 'localhost:3001';

const saveComment = async (token, payload) => {
  try {
    const headers = { authorization: token.token };
    const data = { ...payload };
    const url = (payload.name)
      ? `http://${localhost}/teacher/students`
      : `http://${localhost}/teacher/class`;

    const method = (data.name)
      ? 'put'
      : 'post';

    const request = {
      method,
      url,
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

const fetchClasses = async (token, schoolId) => {
  try {
    const headers = { authorization: token.token };
    const data = { schoolId };

    const request = {
      method: 'get',
      url: `http://${localhost}/teacher`,
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
  saveComment,
  fetchClasses,
  removeClass,
};
