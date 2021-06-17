/*
 * @Author: linkenzone
 * @Date: 2021-05-17 15:51:31
 * @Descripttion: Do not edit
 */
import type { Effect, Reducer } from 'umi';
import { FetchUnchangedList } from '@/extensions/message';

export interface StateType {
  isUnchangedListModalVisible: boolean;
  UnchangedList?: { patients: any[]; total: number };
}

export interface MessageModelType {
  namespace: 'notifications';
  state: StateType;
  effects: {
    fetchUnchangedList: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
    changeModalVisible: Reducer<StateType>;
  };
}

const MessageModel: MessageModelType = {
  namespace: 'notifications',

  state: {
    isUnchangedListModalVisible: false,
    UnchangedList: undefined,
  },

  effects: {
    *fetchUnchangedList({ payload }, { call, put }) {
      const data = yield call(FetchUnchangedList, payload);

      console.log('UnchangedList', data);

      if (data) {
        yield put({
          type: 'save',
          payload: {
            UnchangedList: data,
          },
        });
      }
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },

    changeModalVisible(state, { payload }) {
      return {
        ...state,
        isUnchangedListModalVisible: payload,
      };
    },
  },
};

export default MessageModel;
