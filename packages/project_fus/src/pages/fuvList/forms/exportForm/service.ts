/*
 * @Descripttion: Do not edit
 * @Author: linkenzone
 * @Date: 2021-01-29 15:53:38
 */

import umi_request from 'umi-request';
// import { post_prefix } from '@/utils/request';
import Cookies from 'js-cookie';

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

        // console.log('type', type);
        if (type === 'text/csv; charset=utf-8') {
          // console.log('返回类型为:text/csv', data);
          return data;
        }

        // if (type === 'application/x-xlsx') {
        //   return data;
        // }

        if (type === 'application/json') {
          return { code: '1004', msg: '导出失败', description: 'POST /v1/export' };
        }
        return { code: '1005', msg: '返回类型错误', description: 'POST /v1/export' };
      })
      .catch((error) => {
        console.log(error);
        return { code: '1004', msg: '导出失败', description: 'POST /v1/export' };
      })
  );
}
