/*
 * @Descripttion: 这里定义一些可以全局使用的Model
 * @Author: linkenzone
 * @Date: 2020-09-06 21:24:32
 */

import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import {
  FetchNav,
  AddRecordInfo,
  DeleteRecordInfo,
  FetchResearchCentersList,
  FetchUserAuths,
} from '@/services/global';
import { FetchRemindInfo, CloseRemind } from '@/components/RemindModal/service';
import { ResearchCentersDataType, UserAuthsDataType } from './data';
// import { InGroupInfoDataType } from './data';

export interface StateType {
  userAuths: UserAuthsDataType;
  nav: number;
  remindInfo: any;
  researchCenters: ResearchCentersDataType[];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchNav: Effect;
    addRecordInfo: Effect;
    deleteRecordInfo: Effect;
    fetchRemindInfo: Effect;
    closeRemind: Effect;
    fetchResearchCentersList: Effect;
    fetchUserAuths: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'global',

  state: {
    nav: 0,
    remindInfo: undefined,
    researchCenters: [],
    userAuths: {
      can_analysis: false,
      can_deleteCRF: false,
      can_export: false,
      can_editCenterCRF: false,
    },
  },

  effects: {
    *fetchNav({ payload }, { call, put }) {
      const data = yield call(FetchNav, payload);
      if (data !== undefined && data !== null) {
        yield put({
          type: 'save',
          payload: {
            nav: data,
          },
        });
      }
    },
    *addRecordInfo({ payload }, { call }) {
      const data = yield call(AddRecordInfo, payload);
      if (data) {
        message.success('新增治疗信息成功！');
      }
    },
    *deleteRecordInfo({ payload }, { call }) {
      const data = yield call(DeleteRecordInfo, payload);
      if (data) {
        message.success('删除治疗信息成功！');
      }
    },
    *fetchRemindInfo({ payload }, { call, put }) {
      // console.log("remind")
      const data = yield call(FetchRemindInfo, payload);
      if (data !== undefined && data !== null) {
        yield put({
          type: 'save',
          payload: {
            remindInfo: data,
          },
        });
      }
    },
    *closeRemind({ payload }, { call, put }) {
      // console.log(payload);
      const data = yield call(CloseRemind, payload);
      if (data) {
        message.success('已关闭！');
        yield put({
          type: 'fetchRemindInfo',
          payload: {},
        });
      } else {
        message.error('关闭失败！');
      }
    },
    *fetchResearchCentersList({ payload }, { call, put }) {
      const data = yield call(FetchResearchCentersList, payload);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            researchCenters: data,
          },
        });
      }
    },
    *fetchUserAuths({ payload }, { call, put }) {
      const data = yield call(FetchUserAuths, payload);
      let can_export = false;
      let can_analysis = false;
      let can_deleteCRF = false;
      let can_editCenterCRF = false;
      if (data) {
        for (const item of data) {
          // console.log(item)
          if (item === 'Export') can_export = true;
          if (item === 'Analysis') can_analysis = true;
          if (item === 'DeleteCRF') can_deleteCRF = true;
          if (item === 'EditCenterCRF') can_editCenterCRF = true;
        }
        yield put({
          type: 'save',
          payload: {
            userAuths: {
              can_export,
              can_analysis,
              can_deleteCRF,
              can_editCenterCRF,
            },
          },
        });
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
