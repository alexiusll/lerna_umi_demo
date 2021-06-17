/* eslint-disable no-console */
/*
 * @Descripttion:
 * @Author: linkenzone
 * @Date: 2020-09-15 15:39:13
 */
import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { LungFunctionDataType } from './data';
import {
  FetchLungFunction,
  ModifyLungFunction,
  FetchOtherExam,
  ModifyOtherExam,
  FetchImageExam,
  ModifyImageExam,
  DeleteImageExam,
} from './service';

const lung_list = [
  'FVC',
  'FEV1_FVC',
  'MEF',
  'MEF25',
  'MEF50',
  'MEF75',
  'TLC_sb',
  'RV',
  'RV_TLC',
  'VC',
  'DLCO_ex',
  'DLCO_sb',
  'KCO',
];

export interface StateType {
  lungFunction?: LungFunctionDataType;
  otherExam?: any;
  imageExam?: any;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    addLungFunction: Effect;
    fetchLungFunction: Effect;
    modifyLungFunction: Effect;
    fetchOtherExam: Effect;
    modifyOtherExam: Effect;
    fetchImageExam: Effect;
    modifyImageExam: Effect;
    deleteImageExam: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'otherExam',

  state: {
    lungFunction: undefined,
    otherExam: undefined,
    imageExam: undefined,
  },

  effects: {
    *fetchLungFunction({ payload }, { call, put }) {
      const data = yield call(FetchLungFunction, payload);
      if (data) {
        // 处理可能错误的 比值
        for (const item of lung_list) {
          if (typeof data[`${item}_best`] === 'number' && typeof data[`${item}_exp`] === 'number') {
            if (data[`${item}_exp`] !== 0) {
              data[`${item}_ratio`] = parseFloat(
                ((data[`${item}_best`] / data[`${item}_exp`]) * 100).toFixed(2),
              );
            } else {
              data[`${item}_ratio`] = null;
            }
          }
        }
        yield put({
          type: 'save',
          payload: {
            lungFunction: Object.keys(data).length !== 0 ? data : { id: -404 },
          },
        });
      }
    },
    *addLungFunction({ payload }, { call }) {
      const data = yield call(ModifyLungFunction, payload);
      if (data) {
        // message.success('保存肺功能成功！');
      } else {
        message.success('新增肺功能失败！');
      }
    },
    *modifyLungFunction({ payload }, { call, put }) {
      const data = yield call(ModifyLungFunction, payload);
      if (data) {
        if (Object.keys(payload.body).length !== 0) {
          message.success('保存肺功能成功！');
        }
        yield put({
          type: 'fetchLungFunction',
          payload: {
            pid: payload.pid,
            treNum: payload.treNum,
          },
        });
      } else {
        message.error('保存失败！');
      }
    },

    *fetchOtherExam({ payload }, { call, put }) {
      const data = yield call(FetchOtherExam, payload);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            otherExam: Object.keys(data).length !== 0 ? data : { id: -404 },
          },
        });
      }
    },
    *modifyOtherExam({ payload }, { call, put }) {
      const data = yield call(ModifyOtherExam, payload);
      if (data) {
        if (Object.keys(payload.body).length !== 0) {
          message.success('保存其他检查信息成功！');
        }
        yield put({
          type: 'fetchOtherExam',
          payload: {
            pid: payload.pid,
            treNum: payload.treNum,
          },
        });
      } else {
        message.error('保存失败！');
      }
    },

    *fetchImageExam({ payload }, { call, put }) {
      const data = yield call(FetchImageExam, payload);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            imageExam: data,
          },
        });
      }
    },
    *modifyImageExam({ payload }, { call, put }) {
      const data = yield call(ModifyImageExam, payload);
      if (data) {
        message.success('新增/修改 影像学检查信息成功！');
        yield put({
          type: 'fetchImageExam',
          payload: {
            pid: payload.pid,
            treNum: payload.treNum,
          },
        });
      } else {
        message.error('保存失败！');
      }
    },
    *deleteImageExam({ payload }, { call, put }) {
      const data = yield call(DeleteImageExam, payload);
      if (data) {
        message.success('删除成功！');
        yield put({
          type: 'fetchImageExam',
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
