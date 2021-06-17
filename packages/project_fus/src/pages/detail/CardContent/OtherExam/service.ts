/*
 * @Descripttion:
 * @Author: linkenzone
 * @Date: 2020-09-16 19:50:03
 */

import request from '@/utils/request';

/**
 * @description: 获取肺功能
 * @Param:
 */
export async function FetchLungFunction({ pid, treNum }: { pid: number; treNum: number }) {
  return request(`/v1/other_inspect/lung_function/${pid}/${treNum}`, {
    method: 'GET',
  });
}

/**
 * @description: 添加或修改肺功能
 * @Param:
 */
export async function ModifyLungFunction({
  pid,
  treNum,
  body,
}: {
  pid: number;
  treNum: number;
  body: any;
}) {
  return request(`/v1/other_inspect/lung_function/${pid}/${treNum}`, {
    method: 'POST',
    data: body,
  });
}

/**
 * @description: 获取其他检查
 * @Param:
 */
export async function FetchOtherExam({ pid, treNum }: { pid: number; treNum: number }) {
  return request(`/v1/other_inspect/other_exam/${pid}/${treNum}`, {
    method: 'GET',
  });
}

/**
 * @description: 添加或修改其他检查
 * @Param:
 */
export async function ModifyOtherExam({
  pid,
  treNum,
  body,
}: {
  pid: number;
  treNum: number;
  body: any;
}) {
  return request(`/v1/other_inspect/other_exam/${pid}/${treNum}`, {
    method: 'POST',
    data: body,
  });
}

/**
 * @description: 获取影像学检查
 * @Param:
 */
export async function FetchImageExam({ pid, treNum }: { pid: number; treNum: number }) {
  return request(`/v1/other_inspect/image_exam/${pid}/${treNum}`, {
    method: 'GET',
  });
}

/**
 * @description: 添加或修改影像学检查
 * @Param:
 */
export async function ModifyImageExam({
  pid,
  treNum,
  body,
}: {
  pid: number;
  treNum: number;
  body: any;
}) {
  // console.log("body", body);
  return request(`/v1/other_inspect/image_exam/${pid}/${treNum}`, {
    method: 'POST',
    data: body,
  });
}

/**
 * @description: 删除影像学检查
 * @Param:
 */
export async function DeleteImageExam({
  pid,
  treNum,
  body,
}: {
  pid: number;
  treNum: number;
  body: any;
}) {
  // console.log("body", body);
  return request(`/v1/other_inspect/image_exam/${pid}/${treNum}`, {
    method: 'DELETE',
    data: body,
  });
}