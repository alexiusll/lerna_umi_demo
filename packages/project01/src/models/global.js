import { message } from 'antd'
import { FetchResearchCenterInfo, FetchSignature, PostSignature } from '../services/global'
import CookieUtil from '@/utils/cookie'

const Model = {
  namespace: 'global',

  state: {
    research_centers: []
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  },

  effects: {
    *fetchResearchCenterInfo({ payload }, { call, put }) {
      const { system_id, project_id } = payload
      let data = undefined

      if (project_id == null || project_id == undefined) {
        data = yield call(FetchResearchCenterInfo, { system_id })
      } else {
        data = yield call(FetchResearchCenterInfo, { project_id })
      }

      if (data) {
        yield put({
          type: 'save',
          payload: {
            research_centers: data
          }
        })
      }
    },

    *fetchSignature(_, { call }) {
      const data = yield call(FetchSignature)
      if (data && data.file_path !== null) {
        CookieUtil.set('user_signature', data.file_path, new Date(+new Date() + 24 * 60 * 60 * 1000))
      }
    },

    *postSignature({ payload }, { call }) {
      const data = yield call(PostSignature, payload)

      if (data) {
        message.success('保存签名成功！')
      }
    }
  }
}

export default Model
