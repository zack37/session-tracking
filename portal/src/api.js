import { Observable } from 'rxjs';
import axios from 'axios';

function extract(response) {
  return response.data.data;
}

const createApi = host => {
  return {
    get(path) {
      return Observable.defer(() =>
        axios.get(`${host}${path}`).then(extract)
      )
      .catch(err => {
        console.error(err);

        throw err;
      });
    },

    post(path, obj) {
      return Observable.defer(() => {
        axios.post(`${host}${path}`, obj).then(extract);
      });
    },
  };
};

export default createApi;
