import axios from 'axios';
import settings from '../config';

axios.defaults.baseURL = settings.BASE_URL;

export const HTTP = axios.create({
  baseURL: axios.defaults.baseURL,
  transformRequest: [
    (data, headers) =>
      !headers['Content-Type'] || headers['Content-Type'] === 'application/json' ? JSON.stringify(data) : data,
  ],
  headers: {
    'Content-Type': 'application/json',
    
  },
  // withCredentials: true,
});

export function setInterceptor(cb = null) {
  HTTP.interceptors.response.use(
    (response) => {
      // check errors here and format and send
      // perform a task before the request is sent
      let { data } = response;
      if (response.status !== 200) {
        data = {
          status: 'failed',
          message: data && data.message ? data.message : response.statusText,
          body: data,
          statusCode: response.status,
        };
      }
      return data;
    },
    (error) => {
      let { message } = error;
      if (error.response?.data?.message) {
        message = error.response.data.message;
      }
      if (error.response && error.response.status === 401 && error.response.data.logout && cb) {
        cb();
      }

      return {
        status: 'failed',
        message,
        body: error.response && error.response.data ? error.response.data : {},
      };
    }
  );
}
setInterceptor();
export default HTTP;
