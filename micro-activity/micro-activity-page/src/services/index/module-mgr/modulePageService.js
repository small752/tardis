import qs from 'qs';

export async function queryModulePage(params) {
  return requestData(`${BASE_URL}/modulePage/queryList`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function batchDelete(params) {
  return requestData(`${BASE_URL}/modulePage/batchDelete`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

/*模板页的摘要查询*/
export async function queryPageComList(params) {
  return requestData(`${BASE_URL}/modulePage/queryPageComList`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}
