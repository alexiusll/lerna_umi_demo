/*
 * @Descripttion:
 * @Author: linkenzone
 * @Date: 2020-09-15 15:39:13
 */
import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { PastHistoryDataType, DrugHistoryDataType, HormoneHistoryDataType } from './data';
import {
  FetchPastHistory,
  ModifyPastHistory,
  FetchDrugHistory,
  ModifyDrugHistory,
  DeleteDrugHistory,
} from './service';

export interface StateType {
  pastHistory?: PastHistoryDataType;
  drugHistort: DrugHistoryDataType[];
  hormoneHistory: HormoneHistoryDataType[];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchPastHistory: Effect;
    modifyPastHistory: Effect;
    fetchDrugHistory: Effect;
    modifyDrugHistory: Effect;
    deleteDrugHistory: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'pastHistory',

  state: {
    pastHistory: undefined,
    drugHistort: [],
    hormoneHistory: [],
  },

  effects: {
    *fetchPastHistory({ payload }, { call, put }) {
      const data = yield call(FetchPastHistory, payload);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            pastHistory: Object.keys(data).length !== 0 ? data : undefined,
          },
        });
      }
    },
    *modifyPastHistory({ payload }, { call, put }) {
      const data = yield call(ModifyPastHistory, payload);
      if (data) {
        message.success('保存既往史成功！');
        yield put({
          type: 'fetchPastHistory',
          payload: {
            pid: payload.pid,
          },
        });
      } else {
        message.error('保存既往史失败！');
      }
    },
    *fetchDrugHistory({ payload }, { call, put }) {
      const data = yield call(FetchDrugHistory, payload);

      if (data) {
        if (payload.body.type === 0) {
          yield put({
            type: 'save',
            payload: {
              drugHistort: data,
            },
          });
        } else {
          yield put({
            type: 'save',
            payload: {
              hormoneHistory: data,
            },
          });
        }
      }
    },
    *modifyDrugHistory({ payload }, { call }) {
      const data = yield call(ModifyDrugHistory, payload);
      if (data) {
        message.success('保存药物史成功！');
      }
    },
    *deleteDrugHistory({ payload }, { call }) {
      const data = yield call(DeleteDrugHistory, payload);
      if (data) {
        message.success('删除药物史成功！');
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
