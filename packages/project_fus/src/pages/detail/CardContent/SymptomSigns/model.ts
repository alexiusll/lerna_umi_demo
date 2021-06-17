/* eslint-disable no-console */
/*
 * @Descripttion:
 * @Author: linkenzone
 * @Date: 2020-09-15 15:39:13
 */
import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { FetchTreatmentInfo, ModifyTreatmentInfo, DeleteTreatmentInfo } from './service';

export interface StateType {
  treatment_info?: any;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchTreatmentInfo: Effect;
    modifyTreatmentInfo: Effect;
    deleteTreatmentInfo: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'treatmentInfo',

  state: {
    treatment_info: undefined,
  },

  effects: {
    *fetchTreatmentInfo({ payload }, { call, put }) {
      const data = yield call(FetchTreatmentInfo, payload);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            treatment_info: data,
          },
        });
      }
    },
    *modifyTreatmentInfo({ payload }, { call, put }) {
      const data = yield call(ModifyTreatmentInfo, payload);
      if (data) {
        message.success('新增/修改 症状体征信息成功！');
        yield put({
          type: 'fetchTreatmentInfo',
          payload: {
            pid: payload.pid,
            treNum: payload.treNum,
          },
        });
      } else {
        message.error('新增/修改 失败！');
      }
    },
    *deleteTreatmentInfo({ payload }, { call, put }) {
      const data = yield call(DeleteTreatmentInfo, payload);
      if (data) {
        message.success('删除成功！');
        yield put({
          type: 'fetchTreatmentInfo',
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
