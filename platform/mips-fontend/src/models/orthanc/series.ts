/*
 * @Author: linkenzone
 * @Date: 2021-06-08 19:35:06
 * @Descripttion: Do not edit
 */

import type { Reducer, Effect } from 'umi';
import { services } from '@/extension/Orthanc';

export type StateType = {
  curPatientInfo: any;
  curStudyInfo: any;
  curSeries: any;

  curInstanceList: any[];
};

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchSeries: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'Orthanc_series',

  state: {
    curPatientInfo: null,
    curStudyInfo: null,
    curSeries: null,

    curInstanceList: [],
  },

  effects: {
    *fetchSeries({ payload }, { call, put }) {
      const curSeries = yield call(services.FetchSeries, payload);
      const curInstanceList = yield call(services.FetchInstancesOfSeries, payload);
      if (curInstanceList) {
        yield put({
          type: 'save',
          payload: {
            curInstanceList,
          },
        });
      }
      if (curSeries) {
        yield put({
          type: 'save',
          payload: {
            curSeries,
          },
        });
        const { ParentStudy } = curSeries;
        const curStudyInfo = yield call(services.FetchStudies, { uuid: ParentStudy });
        if (curStudyInfo) {
          yield put({
            type: 'save',
            payload: {
              curStudyInfo,
            },
          });
          const { ParentPatient } = curStudyInfo;
          const curPatientInfo = yield call(services.FetchPatient, { uuid: ParentPatient });
          if (curPatientInfo) {
            yield put({
              type: 'save',
              payload: {
                curPatientInfo,
              },
            });
          }
        }
      }
    },
  },

  reducers: {
    /**
     * @description: 储存配置
     * @Param:
     * @param {*} state
     * @param {*} param2
     */
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

export default Model;
