import request from '@/utils/request';

/**
 * @description: 获取随访记录
 * @Param:
 */
export async function FetchFollInfo({ pid }: { pid: number }) {
  console.log(pid);
  return request(`/v1/treatment_info/follInfo/${pid}`, {
    method: 'GET',
  });
}

/**
 * @description: 添加或修改随访
 * @Param:
 */
export async function ModifyFollInfo({ pid, body }: { pid: number; body: any }) {
  // console.log("body", body);
  return request(`/v1/treatment_info/follInfo/${pid}`, {
    method: 'POST',
    data: body,
  });
}

/**
 * @description: 删除随访
 * @Param:
 */
export async function DeleteFollInfo({ pid, f_id }: { pid: number; f_id: number }) {
  // console.log("body", body);
  return request(`/v1/treatment_info/follInfo/${pid}/${f_id}`, {
    method: 'DELETE',
  });
}

/**
 * @description: 添加病人随访提醒
 * @Param:
 */
export async function ModifyRemind({ pid, body }: { pid: number; body: any }) {
  // console.log("body", body);
  return request(`/v1/treatment_info/patient/follInfo/${pid}`, {
    method: 'POST',
    data: body,
  });
}
