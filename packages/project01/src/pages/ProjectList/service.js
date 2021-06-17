import request from 'umi-request'

export async function FetchProjectProcess({ url }) {
  return request(`${url}/project/process`, {
    method: 'get'
  }).then(function(response) {
    const data = response.data
    return data
  })
}
