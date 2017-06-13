import qs from 'qs';

export async function queryInstanceById(params) {
  return requestData(`${BASE_URL}/instance/queryInstanceById`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function saveModuleInstance(params) {
  return requestData(`${BASE_URL}/instance/saveModuleInstance`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}
