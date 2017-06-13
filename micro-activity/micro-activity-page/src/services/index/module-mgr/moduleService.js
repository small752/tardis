import qs from 'qs';

export async function queryModule(params) {
  return requestData(`${BASE_URL}/module/queryList`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function queryModuleById(params) {
  return requestData(`${BASE_URL}/module/queryModuleById`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function saveModule(params) {
  return requestData(`${BASE_URL}/module/saveModule`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function saveModulePage(params) {
  return requestData(`${BASE_URL}/module/saveModulePage`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}
