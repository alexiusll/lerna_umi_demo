/*
 * @Descripttion:
 * @Author: linkenzone
 * @Date: 2020-09-15 15:39:13
 */
import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { FileInfoDataType } from '@/components/FileTable/data';
import { FetchFileList, DeleteFile } from '@/components/FileTable/service';

export interface StateType {
  fileInfoList: FileInfoDataType[];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: { fetchFileList: Effect; deleteFile: Effect };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'file',

  state: {
    fileInfoList: [],
  },

  effects: {
    *fetchFileList({ payload }, { call, put }) {
      const data = yield call(FetchFileList, payload);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            fileInfoList: data,
          },
        });
      }
    },
    *deleteFile({ payload }, { call }) {
      const data = yield call(DeleteFile, payload);
      if (data) {
        message.success('删除文件成功！');
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
