import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { 
  FetchEvaluation,
  ModifyEvaluation,
  FetchTherapyRecord
} from './service';

export interface StateType {
    evaluation?: any;
    treatmentRecordInfo?: any;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: { 
    fetchEvaluation: Effect;
    modifyEvaluation: Effect;
    fetchTherapyRecord: Effect
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'evaluation',

  state: {
    evaluation: undefined,
    treatmentRecordInfo: undefined
  },

  effects: {
    *fetchEvaluation({ payload }, { call, put }) {
      const data = yield call(FetchEvaluation, payload);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            evaluation: data,
          },
        });
      }
    },
    *modifyEvaluation({ payload }, { call }) {
      const data = yield call(ModifyEvaluation, payload);
      if (data) {
        message.success('新增/修改 疗效评估信息成功！');
      }
    },
    *fetchTherapyRecord({ payload }, { call, put }) {
      const data = yield call(FetchTherapyRecord, payload);
      if (data) {
        if (!data.parent) return;

        if (data.parent.trement === 'surgery') {
          yield put({
            type: 'save',
            payload: {
              treatmentRecordInfo: {
                childTwo: Object.keys(data.child).length !== 0 ? data.child : undefined,
                parent: Object.keys(data.parent).length !== 0 ? data.parent : undefined,
              },
            },
          });
        } else if (data.parent.trement === 'radiotherapy') {
          yield put({
            type: 'save',
            payload: {
              treatmentRecordInfo: {
                childThree: Object.keys(data.child).length !== 0 ? data.child : undefined,
                parent: Object.keys(data.parent).length !== 0 ? data.parent : undefined,
              },
            },
          });
        } else {
          yield put({
            type: 'save',
            payload: {
              treatmentRecordInfo: {
                childOne: Object.keys(data.child).length !== 0 ? data.child : undefined,
                parent: Object.keys(data.parent).length !== 0 ? data.parent : undefined,
              },
            },
          });
        }
      }
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

export default Model;
