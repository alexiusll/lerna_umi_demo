import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { BloodRoutineDataType } from '../data';
import {
  FetchBloodRoutine,
  ModifyBloodRoutine,
  FetchBloodBio,
  ModifyBloodBio,
  FetchThyroid,
  ModifyThyroid,
  FetchCoagulation,
  ModifyCoagulation,
  FetchMyocardialEnzyme,
  ModifyMyocardialEnzyme,
  FetchCytokines,
  ModifyCytokines,
  FetchLymSubsets,
  ModifyLymSubsets,
  FetchUrineRoutine,
  ModifyUrineRoutine,
  FetchTumorMarker,
  ModifyTumorMarker,
} from './service';

export interface StateType {
  bloodRoutine?: BloodRoutineDataType;
  bloodBio?: any;
  thyroid?: any;
  coagulation?: any;
  myocardialEnzyme?: any;
  cytokines?: any;
  lymSubsets?: any;
  urine_routine?: any;
  tumor_marker?: any;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchBloodRoutine: Effect;
    modifyBloodRoutine: Effect;
    fetchBloodBio: Effect;
    modifyBloodBio: Effect;
    fetchThyroid: Effect;
    modifyThyroid: Effect;
    fetchCoagulation: Effect;
    modifyCoagulation: Effect;
    fetchMyocardialEnzyme: Effect;
    modifyMyocardialEnzyme: Effect;
    fetchCytokines: Effect;
    modifyCytokines: Effect;
    fetchLymSubsets: Effect;
    modifyLymSubsets: Effect;
    fetchUrineRoutine: Effect;
    modifyUrineRoutine: Effect;
    fetchTumorMarker: Effect;
    modifyTumorMarker: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'laboratoryExam',

  state: {
    bloodRoutine: undefined,
    bloodBio: undefined,
    thyroid: undefined,
    coagulation: undefined,
    myocardialEnzyme: undefined,
    cytokines: undefined,
    lymSubsets: undefined,
    urine_routine: undefined,
  },

  effects: {
    // 血常规
    *fetchBloodRoutine({ payload }, { call, put }) {
      const data = yield call(FetchBloodRoutine, payload);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            bloodRoutine: Object.keys(data).length !== 0 ? data : { id: -404 },
          },
        });
      }
    },
    *modifyBloodRoutine({ payload }, { call, put }) {
      const data = yield call(ModifyBloodRoutine, payload);
      if (data) {
        if (Object.keys(payload.body).length !== 0) {
          message.success('保存血常规信息成功！');
        }
        yield put({
          type: 'fetchBloodRoutine',
          payload: {
            pid: payload.pid,
            treNum: payload.treNum,
          },
        });
      } else {
        message.error('保存失败！');
      }
    },

    // 血生化
    *fetchBloodBio({ payload }, { call, put }) {
      const data = yield call(FetchBloodBio, payload);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            bloodBio: Object.keys(data).length !== 0 ? data : { id: -404 },
          },
        });
      }
    },
    *modifyBloodBio({ payload }, { call, put }) {
      const data = yield call(ModifyBloodBio, payload);
      if (data) {
        if (Object.keys(payload.body).length !== 0) {
          message.success('保存血生化信息成功！');
        }
        yield put({
          type: 'fetchBloodBio',
          payload: {
            pid: payload.pid,
            treNum: payload.treNum,
          },
        });
      } else {
        message.error('保存失败！');
      }
    },

    // 甲状腺
    *fetchThyroid({ payload }, { call, put }) {
      const data = yield call(FetchThyroid, payload);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            thyroid: Object.keys(data).length !== 0 ? data : { id: -404 },
          },
        });
      }
    },
    *modifyThyroid({ payload }, { call, put }) {
      const data = yield call(ModifyThyroid, payload);
      if (data) {
        if (Object.keys(payload.body).length !== 0) {
          message.success('保存甲状腺检测信息成功！');
        }
        yield put({
          type: 'fetchThyroid',
          payload: {
            pid: payload.pid,
            treNum: payload.treNum,
          },
        });
      } else {
        message.error('保存失败！');
      }
    },

    // 凝血
    *fetchCoagulation({ payload }, { call, put }) {
      const data = yield call(FetchCoagulation, payload);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            coagulation: Object.keys(data).length !== 0 ? data : { id: -404 },
          },
        });
      }
    },
    *modifyCoagulation({ payload }, { call, put }) {
      const data = yield call(ModifyCoagulation, payload);
      if (data) {
        if (Object.keys(payload.body).length !== 0) {
          message.success('保存凝血功能信息成功！');
        }
        yield put({
          type: 'fetchCoagulation',
          payload: {
            pid: payload.pid,
            treNum: payload.treNum,
          },
        });
      } else {
        message.error('保存失败！');
      }
    },

    // 心肌酶谱
    *fetchMyocardialEnzyme({ payload }, { call, put }) {
      const data = yield call(FetchMyocardialEnzyme, payload);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            myocardialEnzyme: Object.keys(data).length !== 0 ? data : { id: -404 },
          },
        });
      }
    },
    *modifyMyocardialEnzyme({ payload }, { call, put }) {
      const data = yield call(ModifyMyocardialEnzyme, payload);
      if (data) {
        if (Object.keys(payload.body).length !== 0) {
          message.success('保存心肌酶谱信息成功！');
        }
        yield put({
          type: 'fetchMyocardialEnzyme',
          payload: {
            pid: payload.pid,
            treNum: payload.treNum,
          },
        });
      } else {
        message.error('保存失败！');
      }
    },

    // 细胞因子
    *fetchCytokines({ payload }, { call, put }) {
      const data = yield call(FetchCytokines, payload);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            cytokines: Object.keys(data).length !== 0 ? data : { id: -404 },
          },
        });
      }
    },
    *modifyCytokines({ payload }, { call, put }) {
      const data = yield call(ModifyCytokines, payload);
      if (data) {
        if (Object.keys(payload.body).length !== 0) {
          message.success('保存细胞因子信息成功！');
        }
        yield put({
          type: 'fetchCytokines',
          payload: {
            pid: payload.pid,
            treNum: payload.treNum,
          },
        });
      } else {
        message.error('保存失败！');
      }
    },

    // 淋巴细胞亚群
    *fetchLymSubsets({ payload }, { call, put }) {
      const data = yield call(FetchLymSubsets, payload);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            lymSubsets: Object.keys(data).length !== 0 ? data : { id: -404 },
          },
        });
      }
    },
    *modifyLymSubsets({ payload }, { call, put }) {
      const data = yield call(ModifyLymSubsets, payload);
      if (data) {
        if (Object.keys(payload.body).length !== 0) {
          message.success('保存淋巴细胞亚群信息成功！');
        }
        yield put({
          type: 'fetchLymSubsets',
          payload: {
            pid: payload.pid,
            treNum: payload.treNum,
          },
        });
      } else {
        message.error('保存失败！');
      }
    },

    // 尿常规
    *fetchUrineRoutine({ payload }, { call, put }) {
      const data = yield call(FetchUrineRoutine, payload);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            urine_routine: Object.keys(data).length !== 0 ? data : { id: -404 },
          },
        });
      }
    },
    *modifyUrineRoutine({ payload }, { call, put }) {
      const data = yield call(ModifyUrineRoutine, payload);
      if (data) {
        if (Object.keys(payload.body).length !== 0) {
          message.success('保存尿常规信息成功！');
        }
        yield put({
          type: 'fetchUrineRoutine',
          payload: {
            pid: payload.pid,
            treNum: payload.treNum,
          },
        });
      } else {
        message.error('保存失败！');
      }
    },

    // 肿瘤标志物
    *fetchTumorMarker({ payload }, { call, put }) {
      const data = yield call(FetchTumorMarker, payload);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            tumor_marker: Object.keys(data).length !== 0 ? data : { id: -404 },
          },
        });
      }
    },
    *modifyTumorMarker({ payload }, { call, put }) {
      const data = yield call(ModifyTumorMarker, payload);
      if (data) {
        if (Object.keys(payload.body).length !== 0) {
          message.success('保存肿瘤标志物信息成功！');
        }
        yield put({
          type: 'fetchTumorMarker',
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
      // console.log(payload);
      return { ...state, ...payload };
    },
  },
};

export default Model;
