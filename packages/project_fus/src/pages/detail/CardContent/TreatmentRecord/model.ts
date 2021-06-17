/*
 * @Descripttion:
 * @Author: linkenzone
 * @Date: 2020-09-15 15:39:13
 */
import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { TreatmentRecordDataType, TherapyPlanDataType } from './data';
import {
  FetchTherapyRecord,
  ModifyTherapyRecord,
  FetchTherapyPlan,
  ModifyTherapyPlan,
  DeleteTherapyPlan,
} from './service';

export interface StateType {
  treatmentRecordInfo?: TreatmentRecordDataType;
  therapyPlan?: TherapyPlanDataType;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchTherapyRecord: Effect;
    modifyTherapyRecord: Effect;
    fetchTherapyPlan: Effect;
    modifyTherapyPlan: Effect;
    switchTrement: Effect;
    deleteTherapyPlan: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'treatmentRecord',

  state: {
    treatmentRecordInfo: undefined,
    therapyPlan: undefined,
  },

  effects: {
    *fetchTherapyRecord({ payload }, { call, put }) {
      const data = yield call(FetchTherapyRecord, payload);
      if (data) {
        if (!data.parent) {
          yield put({
            type: 'save',
            payload: {
              treatmentRecordInfo: undefined,
            },
          });
          return;
        }

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
    },
    *modifyTherapyRecord({ payload }, { call, put }) {
      const data = yield call(ModifyTherapyRecord, payload);
      if (data) {
        message.success('保存治疗记录成功！');
        yield put({
          type: 'fetchTherapyRecord',
          payload: {
            pid: payload.pid,
            treNum: payload.treNum,
          },
        });
      } else {
        message.error('保存治疗记录失败！');
      }
    },
    *switchTrement({ payload }, { call }) {
      const data = yield call(ModifyTherapyRecord, payload);
      if (data) {
        console.log('切换治疗类型');
      }
    },
    *fetchTherapyPlan({ payload }, { call, put }) {
      const data = yield call(FetchTherapyPlan, payload);
      if (data) {
        // console.log('data', data);
        // 数据遗留问题
        // eslint-disable-next-line guard-for-in
        for (const key in data) {
          for (const item of data[key]) {
            if (typeof item.drugs === 'object' && item.drugs) {
              if (typeof item.drugs.length !== 'number') {
                console.log('执行drugs类型转换(如果类型为object,则转换为数组)');
                // 如果类型为object 转换为数组
                const _drugs = [];
                // eslint-disable-next-line guard-for-in
                for (const _key in item.drugs) {
                  let dose = '';
                  if (item.drugs[_key].drugDosa) {
                    dose += item.drugs[_key].drugDosa;
                    if (item.drugs[_key].unit) {
                      dose += item.drugs[_key].unit;
                    }
                  }
                  _drugs.push({
                    name: _key,
                    dose,
                  });
                }
                item.drugs = _drugs;
              }
            }
          }
        }
        yield put({
          type: 'save',
          payload: {
            therapyPlan: Object.keys(data).length !== 0 ? data : undefined,
          },
        });
      }
    },
    *modifyTherapyPlan({ payload }, { call }) {
      const data = yield call(ModifyTherapyPlan, payload);
      if (data) {
        message.success('保存详细治疗方案成功！');
      }
    },

    *deleteTherapyPlan({ payload }, { call }) {
      const data = yield call(DeleteTherapyPlan, payload);
      if (data) {
        message.success('删除详细治疗方案成功！');
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
