export function useQueryExecution(
  url,
  headers = {
    "content-type": "application/json",
  }
) {
  const handleRequest = (res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res.status);
  };

  const executeGet = () => {
    return fetch(url, {
      method: 'GET',
      headers: headers
    })
      .then(res => handleRequest(res));
  }

  return { executeGet };
};
