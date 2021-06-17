/*
 * @Descripttion:
 * @Author: HlgdB
 * @Date: 2020-09-26 15:36:23
 */
import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { FetchImmunohis, ModifyImmunohis } from './service';

export interface StateType {
  immunohis?: any;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: { fetchImmunohis: Effect; modifyImmunohis: Effect };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'immunohis',

  state: {
    immunohis: undefined,
  },

  effects: {
    *fetchImmunohis({ payload }, { call, put }) {
      const data = yield call(FetchImmunohis, payload);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            immunohis: Object.keys(data).length !== 0 ? data : { id: -404 },
          },
        });
      }
    },
    *modifyImmunohis({ payload }, { call, put }) {
      const data = yield call(ModifyImmunohis, payload);
      if (data) {
        if (Object.keys(payload.body).length !== 0) {
          message.success('保存免疫组化信息成功！');
        }
        yield put({
          type: 'fetchImmunohis',
          payload: {
            pid: payload.pid,
            treNum: payload.treNum,
          },
        });
      } else {
        message.error('保存失败！');
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
