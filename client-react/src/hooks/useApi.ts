import { useEffect, useState, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios, { AxiosPromise } from 'axios';
import { AppContext } from '../contexts/app-context';

export const useApi = (url: string, options: any, callback: Function) => {
  const { getAccessTokenSilently } = useAuth0();
  const [promise, setPromise] = useState<AxiosPromise>();
  const [state, setState] = useState({
    error: null,
    loading: true,
    data: null,
  });
  const { dispatch } = useContext(AppContext);

  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const { audience, scope, ...axiosOptions } = options;
        const accessToken = await getAccessTokenSilently({ audience, scope });
        const res = await axios(url, {
          ...axiosOptions,
          headers: {
            ...axiosOptions.headers,
            // Add the Authorization header to the existing headers
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setState({
          ...state,
          data: await res.data,
          error: null,
          loading: false,
        });
      } catch (error) {}
    })();
  }, [refreshIndex]);

  return {
    promise,
    refresh: () => setRefreshIndex(refreshIndex + 1),
  };
};
