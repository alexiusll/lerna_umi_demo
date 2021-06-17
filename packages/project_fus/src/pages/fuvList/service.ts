/*
 * @Descripttion: list请求
 * @Author: linkenzone
 * @Date: 2020-09-10 20:13:06
 */

import umi_request from 'umi-request';
// import request, { post_prefix } from '@/utils/request';

import request from '@/utils/request';
import Cookies from 'js-cookie';

/**
 * @description: 获取样本
 * @Param:
 */
export async function FetchFuvList({ body, params }: { body: any; params: any }) {
  return request('/v1/sample/all', {
    method: 'POST',
    params,
    data: body,
  });
}

/**
 * @description: 新增样本
 * @Param:
 */
export async function AddFuv({ body }: { body: any }) {
  return request('/v1/sample', {
    method: 'POST',
    data: body,
  });
}

/**
 * @description: 样本添加录入人
 * @Param:
 */
export async function AddAccount({ pid, body }: { pid: number; body: any }) {
  return request(`/v1/sample/${pid}/add_account`, {
    method: 'POST',
    data: body,
  });
}

/**
 * @description: 删除样本
 * @Param:
 */
export async function DeleteFuv({ body }: { body: any }) {
  return request('/v1/sample', {
    method: 'Delete',
    data: body,
  });
}

// /**
//  * @description: 导出样本，将弃用
//  * @Param:
//  */
// export async function ExportFuv({ body }: { body: any }) {
//   // 处理下载文件
//   return (
//     umi_request
//       .post('/v1/sample/export', {
//         prefix: post_prefix,
//         // 加上responseType 不然会乱码
//         responseType: 'arrayBuffer',
//         getResponse: true,
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${Cookies.get('token_5')}`,
//         },
//         data: body,
//       })
//       // eslint-disable-next-line func-names
//       .then(function ({ data, response }) {
//         const type = response.headers.get('Content-Type');
//         console.log('response', response);
//         if (type === 'application/x-xlsx') {
//           return data;
//         }
//         if (type === 'application/json') {
//           return { code: '1004', msg: '权限不足', description: 'POST /v1/sample/export' };
//         }
//         return { code: '1005', msg: '返回类型错误', description: 'POST /v1/sample/export' };
//       })
//   );
// }

/**
 * @description: 导出excel表
 * @Param:
 */
export async function ExportFuv({ body }: { body: any }) {
  // 处理下载文件
  return (
    umi_request
      .post('/v1/export', {
        prefix: API_URL,
        // 加上responseType 不然会乱码
        responseType: 'arrayBuffer',
        getResponse: true,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token_5')}`,
        },
        data: body,
      })
      // eslint-disable-next-line func-names
      .then(function ({ data, response }) {
        const type = response.headers.get('Content-Type');
        console.log('response', response);
        if (type === 'application/x-xlsx') {
          return data;
        }
        if (type === 'application/json') {
          return { code: '1004', msg: '权限不足', description: 'POST /v1/export' };
        }
        return { code: '1005', msg: '返回类型错误', description: 'POST /v1/export' };
      })
  );
}
