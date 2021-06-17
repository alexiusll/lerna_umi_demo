/*
 * @Descripttion:
 * @Author: linkenzone
 * @Date: 2020-09-15 15:39:13
 */
import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { PatientDataType } from './data';
import { FetchPatient, ModifyPatient } from './service';

export interface StateType {
  patientInfo?: PatientDataType;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: { fetchPatient: Effect; modifyPatient: Effect };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'patient',

  state: {
    patientInfo: undefined,
  },

  effects: {
    *fetchPatient({ payload }, { call, put }) {
      const data = yield call(FetchPatient, payload);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            patientInfo: Object.keys(data).length !== 0 ? data : undefined,
          },
        });
      }
    },
    *modifyPatient({ payload }, { call, put }) {
      const data = yield call(ModifyPatient, payload);
      if (data) {
        message.success('保存基本信息成功！');
        yield put({
          type: 'fetchPatient',
          payload: {
            pid: payload.pid,
          },
        });
      } else {
        message.error('保存基本信息失败！');
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
