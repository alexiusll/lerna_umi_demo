import { FetchProjectList } from '../../services/projectPage'
import { FetchProjectProcess } from './service'

const Model = {
  namespace: 'project',

  state: {
    project_list: [],
    project_process: { 1: {}, 2: {}, 3: {} }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
    updateProcess(state, { payload }) {
      // console.log('state_project_process', state.project_process)
      state.project_process[payload.project_id] = payload.project_process
      return state
    }
  },

  effects: {
    *fetchProjectList({ payload }, { call, put }) {
      const data = yield call(FetchProjectList, payload)

      if (data) {
        yield put({
          type: 'save',
          payload: {
            project_list: data
          }
        })
      }
    },
    *fetchProjectProcess({ payload }, { call, put }) {
      const data = yield call(FetchProjectProcess, payload)

      if (data) {
        yield put({
          type: 'updateProcess',
          payload: {
            project_id: payload.project_id,
            project_process: data
          }
        })
      }
    }
  }
}

export default Model
