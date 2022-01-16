export async function postData(url: string = '', data = {}) {
  const domain: string = 'http://localhost:3000';
  const response = await fetch(domain + url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    body: JSON.stringify(data)
  });

  if (response.status !== 200) {
    const result = await response.json();
    return Promise.reject(result.errors[0].msg);
  }

  return response.json();
}

export async function putData(url: string = '', data = {}) {
  const domain: string = 'http://localhost:3000';
  const response = await fetch(domain + url, {
    method: 'PUT',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    body: JSON.stringify(data)
  });

  if (response.status !== 200) {
    const result = await response.json();
    return Promise.reject(result.errors[0].msg);
  }

  return response.json();
}

export async function getData(url: string = ''): Promise<any> {
  const domain: string = 'http://localhost:3000';
  const response = await fetch(domain + url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow'
  });

  if (response.status !== 200) {
    const result = await response.json();
    return Promise.reject(result.errors[0].msg);
  }

  return response.json();
}
