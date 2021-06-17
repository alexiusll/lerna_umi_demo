/*
 * @Descripttion:
 * @Author: linkenzone
 * @Date: 2020-09-23 20:12:00
 */

import request from '@/utils/request';

/**
 * @description: 获取
 * @Param:
 */
export async function FetchTherapyRecord({ pid, treNum }: { pid: number; treNum: number }) {
  return request(`/v1/therapy_record/${pid}/${treNum}`, {
    method: 'GET',
  });
}

/**
 * @description: 添加或修改
 * @Param:
 */
export async function ModifyTherapyRecord({
  pid,
  treNum,
  body,
}: {
  pid: number;
  treNum: number;
  body: any;
}) {
  return request(`/v1/therapy_record/${pid}/${treNum}`, {
    method: 'POST',
    data: body,
  });
}

/**
 * @description: 获取详细治疗方案
 * @Param:
 */
export async function FetchTherapyPlan({ pid, treNum }: { pid: number; treNum: number }) {
  return request(`/v1/therapy_record/therapy_plan/${pid}/${treNum}`, {
    method: 'GET',
  });
}

/**
 * @description: 添加详细治疗方案
 * @Param:
 */
export async function ModifyTherapyPlan({
  pid,
  treNum,
  body,
}: {
  pid: number;
  treNum: number;
  body: any;
}) {
  return request(`/v1/therapy_record/therapy_plan/${pid}/${treNum}`, {
    method: 'POST',
    data: body,
  });
}

/**
 * @description: 添加详细治疗方案
 * @Param:
 */
export async function DeleteTherapyPlan({
  pid,
  treNum,
  body,
}: {
  pid: number;
  treNum: number;
  body: any;
}) {
  return request(`/v1/therapy_record/therapy_plan/${pid}/${treNum}`, {
    method: 'DELETE',
    data: body,
  });
}
