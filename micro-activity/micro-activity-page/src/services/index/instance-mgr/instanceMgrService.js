import qs from 'qs';

export async function queryInstance(params) {
  return requestData(`${BASE_URL}/instance/queryList`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function batchDelete(params) {
  return requestData(`${BASE_URL}/instance/batchDelete`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}
