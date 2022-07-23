const defaultHeaders = {
  "content-type": "application/json",
}

const handleRequest = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(res);
};

const executeGet = (url, headers = defaultHeaders) => {
  return fetch(url, {
    method: 'GET',
    headers: headers
  })
    .then(res => handleRequest(res));
}

const executePost = (url, data, headers = defaultHeaders) => {
  return fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  })
    .then(res => handleRequest(res));
}

const executePatch = (url, data, headers = defaultHeaders) => {
  return fetch(url, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(data)
  })
    .then(res => handleRequest(res));
}

export { executeGet, executePost, executePatch };
