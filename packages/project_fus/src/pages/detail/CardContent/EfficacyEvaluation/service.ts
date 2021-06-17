import request from '@/utils/request';

/**
 * @description: 获取疗效评估
 * @Param:
 */
export async function FetchEvaluation({ pid, treNum, trement }: { pid: number; treNum: number, trement: string }) {
    console.log("trement", trement)
    return request(`/v1/treatment_info/evaluation/${pid}/${treNum}/${trement}`, {
        method: 'GET',
    });
}

/**
 * @description: 添加或修改疗效评估
 * @Param:
 */
export async function ModifyEvaluation({
    pid,
    treNum,
    trement,
    body,
}: {
    pid: number;
    treNum: number;
    trement: string;
    body: any;
}) {
    console.log("trement", trement)
    return request(`/v1/treatment_info/evaluation/${pid}/${treNum}/${trement}`, {
        method: 'POST',
        data: body,
    });
}

/**
 * @description: 获取
 * @Param:
 */
export async function FetchTherapyRecord({ pid, treNum }: { pid: number; treNum: number }) {
    return request(`/v1/therapy_record/${pid}/${treNum}`, {
      method: 'GET',
    });
  }