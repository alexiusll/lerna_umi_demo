/* eslint-disable no-console */
/*
 * @Descripttion:
 * @Author: HlgdB
 * @Date: 2020-09-26 22:19:23
 */
import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { FetchSideEffect, ModifySideEffect, DeleteSideEffect } from './service';

export interface StateType {
  side_effect?: any;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchSideEffect: Effect;
    modifySideEffect: Effect;
    deleteSideEffect: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'sideEffect',

  state: {
    side_effect: undefined,
  },

  effects: {
    *fetchSideEffect({ payload }, { call, put }) {
      const data = yield call(FetchSideEffect, payload);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            side_effect: data,
          },
        });
      }
    },
    *modifySideEffect({ payload }, { call, put }) {
      const data = yield call(ModifySideEffect, payload);
      if (data) {
        message.success('新增/修改 副反应信息成功！');
        yield put({
          type: 'fetchSideEffect',
          payload: {
            pid: payload.pid,
            treNum: payload.treNum,
          },
        });
      } else {
        message.error('新增/修改 失败！');
      }
    },
    *deleteSideEffect({ payload }, { call, put }) {
      const data = yield call(DeleteSideEffect, payload);
      if (data) {
        message.success('删除成功！');
        yield put({
          type: 'fetchSideEffect',
          payload: {
            pid: payload.pid,
            treNum: payload.treNum,
          },
        });
      } else {
        message.error('删除失败！');
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
