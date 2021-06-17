import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { FetchFollInfo, ModifyFollInfo, DeleteFollInfo, ModifyRemind } from './service';

export interface StateType {
  foll_info?: any;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchFollInfo: Effect;
    modifyFollInfo: Effect;
    deleteFollInfo: Effect;
    modifyRemind: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'follInfo',

  state: {
    foll_info: undefined,
  },

  effects: {
    *fetchFollInfo({ payload }, { call, put }) {
      const data = yield call(FetchFollInfo, payload);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            foll_info: data,
          },
        });
      }
    },
    *modifyFollInfo({ payload }, { call, put }) {
      const data = yield call(ModifyFollInfo, payload);
      if (data) {
        message.success('新增/修改 随访信息成功！');
        yield put({
          type: 'fetchFollInfo',
          payload: {
            pid: payload.pid,
          },
        });
      } else {
        message.error('新增/修改 失败！');
      }
    },
    *deleteFollInfo({ payload }, { call, put }) {
      const data = yield call(DeleteFollInfo, payload);
      if (data) {
        message.success('删除成功！');
        yield put({
          type: 'fetchFollInfo',
          payload: {
            pid: payload.pid,
          },
        });
      } else {
        message.error('删除失败！');
      }
    },
    *modifyRemind({ payload }, { call }) {
      const data = yield call(ModifyRemind, payload);
      if (data) {
        message.success('设置成功！');
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

export default Model;
