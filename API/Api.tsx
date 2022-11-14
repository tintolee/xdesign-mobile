import axios from 'axios';
import {Endpoint} from '../types/types';

type Ids = (number | string | boolean)[];

export const useApi = () => {
  const call = (endpoint: Endpoint, ids?: Ids) => {
    const axiosConfiguration = {
      url: InsertIdsIntoUrl(endpoint.url, ids),
      method: endpoint.method,
    };

    return axios(Object.fromEntries(Object.entries(axiosConfiguration).filter(([_, value]) => value != null)));
  };

  const InsertIdsIntoUrl = (url: string, ids?: Ids) => {
    let _url;

    if (!ids) {
      return url;
    }

    for (let i = 0; i < ids.length; i++) {
      _url = (_url || url)?.replace(`#{${i}}`, ids[i].toString());
    }

    return _url;
  };

  return {call};
};
