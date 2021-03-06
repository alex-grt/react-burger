import { BASE_URL } from './constants';
import { executeGet, executePatch, executePost } from './api';
import { deleteCookie, getCookie, setCookie } from './cookieMethods';

export function getWithRefresh(url, headers) {
  return executeGet(url, headers)
    .then(res => {
      return res;
    })
    .catch(async err => {
      if (err.status === 403) {
        const refreshToken = localStorage.getItem('refreshToken');

        deleteCookie('accessToken');
        await executePost(`${BASE_URL}auth/token`, { token: refreshToken })
          .then(res => {
            const token = res.accessToken.split('Bearer ')[1];

            setCookie('accessToken', token, {
              expires: 1200,
              SameSite: 'None',
              Secure: true
            });
            localStorage.setItem('refreshToken', res.refreshToken);
          })
          .catch(err => {
            alert(`Ошибка: ${err}`);
          });

        headers.authorization = 'Bearer ' + getCookie('accessToken');
        const res = await executeGet(url, headers);
        return res;
      } else {
        return Promise.reject(err);
      }
    });
}

export function postWithRefresh(url, data, headers) {
  return executePost(url, data, headers)
    .then(res => {
      return res;
    })
    .catch(async err => {
      if (err.status === 403) {
        const refreshToken = localStorage.getItem('refreshToken');

        deleteCookie('accessToken');
        await executePost(`${BASE_URL}auth/token`, { token: refreshToken })
          .then(res => {
            const token = res.accessToken.split('Bearer ')[1];

            setCookie('accessToken', token, {
              expires: 1200,
              SameSite: 'None',
              Secure: true
            });
            localStorage.setItem('refreshToken', res.refreshToken);
          })
          .catch(err => {
            alert(`Ошибка: ${err}`);
          });

        headers.authorization = 'Bearer ' + getCookie('accessToken');
        const res = await executePost(url, data, headers);
        return res;
      } else {
        return Promise.reject(err);
      }
    });
}

export function patchWithRefresh(url, data, headers) {
  return executePatch(url, data, headers)
    .then(res => {
      return res;
    })
    .catch(async err => {
      if (err.status === 403) {
        const refreshToken = localStorage.getItem('refreshToken');

        deleteCookie('accessToken');
        await executePost(`${BASE_URL}auth/token`, { token: refreshToken })
          .then(res => {
            const token = res.accessToken.split('Bearer ')[1];

            setCookie('accessToken', token, {
              expires: 1200,
              SameSite: 'None',
              Secure: true
            });
            localStorage.setItem('refreshToken', res.refreshToken);
          })
          .catch(err => {
            alert(`Ошибка: ${err}`);
          });

        headers.authorization = 'Bearer ' + getCookie('accessToken');
        const res = await executePatch(url, data, headers);
        return res;
      } else {
        return Promise.reject(err);
      }
    });
}
