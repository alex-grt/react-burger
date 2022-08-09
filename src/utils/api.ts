import { IHeaders } from "./types";

const defaultHeaders = {
  "content-type": "application/json",
}

const handleRequest = (res: any) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(res);
};

const executeGet = (
  url: string,
  headers: IHeaders = defaultHeaders
): Promise<any> => {
  return fetch(url, {
    method: 'GET',
    headers: headers
  })
    .then(res => handleRequest(res));
}

const executePost = (
  url: string,
  data: object,
  headers: IHeaders = defaultHeaders
): Promise<any> => {
  return fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  })
    .then(res => handleRequest(res));
}

const executePatch = (
  url: string,
  data: object,
  headers: IHeaders = defaultHeaders
): Promise<any> => {
  return fetch(url, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(data)
  })
    .then(res => handleRequest(res));
}

export { executeGet, executePost, executePatch };
