/*
 * @Descripttion:
 * @Author: HlgdB
 * @Date: 2020-09-26 15:36:23
 */
import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { FetchMoleDetec, ModifyMoleDetec } from './service';

export interface StateType {
  mole_detec?: any;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: { fetchMoleDetec: Effect; modifyMoleDetec: Effect };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'moleDetec',

  state: {
    mole_detec: undefined,
  },

  effects: {
    *fetchMoleDetec({ payload }, { call, put }) {
      const data = yield call(FetchMoleDetec, payload);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            mole_detec: Object.keys(data).length !== 0 ? data : { id: -404 },
          },
        });
      }
    },
    *modifyMoleDetec({ payload }, { call, put }) {
      const data = yield call(ModifyMoleDetec, payload);
      if (data) {
        if (Object.keys(payload.body).length !== 0) {
          message.success('保存分子检测信息成功！');
        }
        yield put({
          type: 'fetchMoleDetec',
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
