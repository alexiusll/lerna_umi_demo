/*
 * @Author: linkenzone
 * @Date: 2021-06-08 19:07:56
 * @Descripttion: Do not edit
 */

import type { Reducer, Effect } from 'umi';
import { services } from '@/extension/Orthanc';

export type StateType = {
  curPatientInfo: any;
  curStudyInfo: any;
  curSeriesList: any[];
};

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchStudy: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'Orthanc_study',

  state: {
    curPatientInfo: null,
    curStudyInfo: null,
    curSeriesList: [],
  },

  effects: {
    *fetchStudy({ payload }, { call, put }) {
      const curStudyInfo = yield call(services.FetchStudies, payload);
      const curSeriesList = yield call(services.FetchSeriesOfStudies, payload);

      if (curSeriesList) {
        yield put({
          type: 'save',
          payload: {
            curSeriesList,
          },
        });
      }

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
