/*
 * @Descripttion:
 * @Author: linkenzone
 * @Date: 2020-09-15 15:39:13
 */
import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { FirstVisitDataType } from './data';
import { FetchFirstDiagnose, ModifyFirstDiagnose } from './service';

export interface StateType {
  firstVisitInfo?: FirstVisitDataType;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchFirstDiagnose: Effect;
    modifyFirstDiagnose: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'firstVisit',

  state: {
    firstVisitInfo: undefined,
  },

  effects: {
    *fetchFirstDiagnose({ payload }, { call, put }) {
      const data = yield call(FetchFirstDiagnose, payload);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            firstVisitInfo: Object.keys(data).length !== 0 ? data : undefined,
          },
        });
      }
    },
    *modifyFirstDiagnose({ payload }, { call, put }) {
      const data = yield call(ModifyFirstDiagnose, payload);
      if (data) {
        message.success('保存初诊过程成功！');
        yield put({
          type: 'fetchFirstDiagnose',
          payload: {
            pid: payload.pid,
          },
        });
      } else {
        message.error('保存初诊过程失败！');
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
