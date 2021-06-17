/*
 * @Descripttion:
 * @Author: HlgdB
 * @Date: 2020-09-26 13:41:22
 */

import request from '@/utils/request';

/**
 * @description: 获取血常规
 * @Param:
 */
export async function FetchBloodRoutine({ pid, treNum }: { pid: number; treNum: number }) {
  return request(`/v1/lab_inspectation/blood_routine/${pid}/${treNum}`, {
    method: 'GET',
  });
}

/**
 * @description: 添加或修改血常规
 * @Param:
 */
export async function ModifyBloodRoutine({
  pid,
  treNum,
  body,
}: {
  pid: number;
  treNum: number;
  body: any;
}) {
  // console.log(body);
  // return 1;
  return request(`/v1/lab_inspectation/blood_routine/${pid}/${treNum}`, {
    method: 'POST',
    data: body,
  });
}

/**
 * @description: 获取血生化
 * @Param:
 */
export async function FetchBloodBio({ pid, treNum }: { pid: number; treNum: number }) {
  return request(`/v1/lab_inspectation/blood_bio/${pid}/${treNum}`, {
    method: 'GET',
  });
}

/**
 * @description: 添加或修改血生化
 * @Param:
 */
export async function ModifyBloodBio({
  pid,
  treNum,
  body,
}: {
  pid: number;
  treNum: number;
  body: any;
}) {
  // console.log(body);
  // return 1;
  return request(`/v1/lab_inspectation/blood_bio/${pid}/${treNum}`, {
    method: 'POST',
    data: body,
  });
}

/**
 * @description: 获取甲状腺
 * @Param:
 */
export async function FetchThyroid({ pid, treNum }: { pid: number; treNum: number }) {
  return request(`/v1/lab_inspectation/thyroid/${pid}/${treNum}`, {
    method: 'GET',
  });
}

/**
 * @description: 添加或修改甲状腺
 * @Param:
 */
export async function ModifyThyroid({
  pid,
  treNum,
  body,
}: {
  pid: number;
  treNum: number;
  body: any;
}) {
  // console.log(body);
  // return 1;
  return request(`/v1/lab_inspectation/thyroid/${pid}/${treNum}`, {
    method: 'POST',
    data: body,
  });
}

/**
 * @description: 获取凝血
 * @Param:
 */
export async function FetchCoagulation({ pid, treNum }: { pid: number; treNum: number }) {
  return request(`/v1/lab_inspectation/coagulation/${pid}/${treNum}`, {
    method: 'GET',
  });
}

/**
 * @description: 添加或修改凝血
 * @Param:
 */
export async function ModifyCoagulation({
  pid,
  treNum,
  body,
}: {
  pid: number;
  treNum: number;
  body: any;
}) {
  // console.log(body);
  // return 1;
  return request(`/v1/lab_inspectation/coagulation/${pid}/${treNum}`, {
    method: 'POST',
    data: body,
  });
}

/**
 * @description: 获取心肌酶谱
 * @Param:
 */
export async function FetchMyocardialEnzyme({ pid, treNum }: { pid: number; treNum: number }) {
  return request(`/v1/lab_inspectation/myocardialEnzyme/${pid}/${treNum}`, {
    method: 'GET',
  });
}

/**
 * @description: 添加或修改心肌酶谱
 * @Param:
 */
export async function ModifyMyocardialEnzyme({
  pid,
  treNum,
  body,
}: {
  pid: number;
  treNum: number;
  body: any;
}) {
  // console.log(body);
  // return 1;
  return request(`/v1/lab_inspectation/myocardialEnzyme/${pid}/${treNum}`, {
    method: 'POST',
    data: body,
  });
}

/**
 * @description: 获取细胞因子
 * @Param:
 */
export async function FetchCytokines({ pid, treNum }: { pid: number; treNum: number }) {
  return request(`/v1/lab_inspectation/cytokines/${pid}/${treNum}`, {
    method: 'GET',
  });
}

/**
 * @description: 添加或修改细胞因子
 * @Param:
 */
export async function ModifyCytokines({
  pid,
  treNum,
  body,
}: {
  pid: number;
  treNum: number;
  body: any;
}) {
  // console.log(body);
  // return 1;
  return request(`/v1/lab_inspectation/cytokines/${pid}/${treNum}`, {
    method: 'POST',
    data: body,
  });
}

/**
 * @description: 获取淋巴细胞亚群
 * @Param:
 */
export async function FetchLymSubsets({ pid, treNum }: { pid: number; treNum: number }) {
  return request(`/v1/lab_inspectation/lymSubsets/${pid}/${treNum}`, {
    method: 'GET',
  });
}

/**
 * @description: 添加或修改淋巴细胞亚群
 * @Param:
 */
export async function ModifyLymSubsets({
  pid,
  treNum,
  body,
}: {
  pid: number;
  treNum: number;
  body: any;
}) {
  // console.log(body);
  // return 1;
  return request(`/v1/lab_inspectation/lymSubsets/${pid}/${treNum}`, {
    method: 'POST',
    data: body,
  });
}

/**
 * @description: 获取淋巴尿常规
 * @Param:
 */
export async function FetchUrineRoutine({ pid, treNum }: { pid: number; treNum: number }) {
  return request(`/v1/lab_inspectation/urine_routine/${pid}/${treNum}`, {
    method: 'GET',
  });
}

/**
 * @description: 添加或修改尿常规
 * @Param:
 */
export async function ModifyUrineRoutine({
  pid,
  treNum,
  body,
}: {
  pid: number;
  treNum: number;
  body: any;
}) {
  // console.log(body);
  // return 1;
  return request(`/v1/lab_inspectation/urine_routine/${pid}/${treNum}`, {
    method: 'POST',
    data: body,
  });
}

/**
 * @description: 获取肿瘤标志物
 * @Param:
 */
export async function FetchTumorMarker({ pid, treNum }: { pid: number; treNum: number }) {
  return request(`/v1/lab_inspectation/tumor_marker/${pid}/${treNum}`, {
    method: 'GET',
  });
}

/**
 * @description: 添加或修改肿瘤标志物
 * @Param:
 */
export async function ModifyTumorMarker({
  pid,
  treNum,
  body,
}: {
  pid: number;
  treNum: number;
  body: any;
}) {
  // console.log(body);
  // return 1;
  return request(`/v1/lab_inspectation/tumor_marker/${pid}/${treNum}`, {
    method: 'POST',
    data: body,
  });
}
