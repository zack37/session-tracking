import { Observable } from 'rxjs';
import axios from 'axios';

const createApi = host => {
  return {
    get(path) {
      return Observable.defer(() =>
        axios
          .get(`${host}${path}`, {
            // headers: { 'Access-Control-Allow-Origin': '*' },
          })
          .then(response => response.data.data)
      );
    },
  };
};

export default createApi;
