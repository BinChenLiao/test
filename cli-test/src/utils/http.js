import axios from 'axios';

const Http = {
  _hoststr: '',
  _timeout: 60000, // 60s
  post(url, data = {}, headers = {}, usrTimeout = null, errorCallback) {
    return new Promise((resolve, reject) => {
      axios.post(url, data, {
        headers: headers,
        timeout: usrTimeout || Http._timeout
      }).then(res => {
        resolve(res.data);
      }).catch(error => {
        reject(error);
      });
    });
  },
  get: (url, params = {}, headers = {}, usrTimeout = null, errorCallback) => {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: params,
        headers: headers,
        timeout: usrTimeout || Http._timeout
      }).then(res => {
        resolve(res.data);
      }).catch(err => {
        reject(err);
      });
    });
  }
}
export default Http;