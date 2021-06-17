/*
 * @Descripttion:
 * @Author: linkenzone
 * @Date: 2020-09-10 20:12:59
 */

import { Effect, Reducer } from 'umi';
import { message, notification } from 'antd';
import { FuvListItemDataType } from './data';
import { FetchFuvList, AddFuv, DeleteFuv, ExportFuv } from './service';

export interface StateType {
  fuvList: FuvListItemDataType[];
  total: number;
  all_pids: [];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchFuvList: Effect;
    addFuv: Effect;
    deleteFuv: Effect;
    exportFuv: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'fuvList',

  state: {
    fuvList: [],
    total: 0,
    all_pids: [],
  },

  effects: {
    *fetchFuvList({ payload }, { call, put }) {
      const data = yield call(FetchFuvList, payload);
      console.log('all_pids', data);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            fuvList: data.data,
            total: data.total,
            all_pids: data.all_pids,
          },
        });
      }
    },
    *addFuv({ payload }, { call }) {
      const data = yield call(AddFuv, payload);
      if (data) {
        message.success('新增样本成功！');
      }
    },
    *deleteFuv({ payload }, { call }) {
      const data = yield call(DeleteFuv, payload);
      if (data) {
        message.success('删除样本成功！');
      }
    },
    *exportFuv({ payload }, { call }) {
      // const data = yield call(ExportFuv, payload);
      // if (data) {
      //   message.success('导出样本成功！');
      // }

      yield ExportFuv(payload).then((data: any) => {
        console.log('data', data);
        if (data.code) {
          notification.error({ message: data.msg, description: data.request });
          return;
        }
        // type 为需要导出的文件类型，此处为xls表格类型
        const blob = new Blob([data], { type: 'application/x-xlsx;charset=utf-8' });
        // const file = new File([data], 'sample.xlsx', { type: 'application/x-xlsx;charset=utf-8' })
        // 创建下载链接
        const downloadHref = window.URL.createObjectURL(blob);

        // 创建a标签并为其添加属性
        const downloadLink = document.createElement('a');

        downloadLink.href = downloadHref;
        downloadLink.download = '样本数据.xlsx';
        // 触发点击事件执行下载
        downloadLink.click();
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

export default Model;
