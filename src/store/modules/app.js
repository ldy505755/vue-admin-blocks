import qs from 'qs'

const state = {
  loading: false, // 加载状态
  resError: '' // 错误数据
}

const getters = {
  getLoading: state => state.loading,
  getResError: state => state.resError
}

const mutations = {
  // 更新加载状态
  LOADING: (state, data) => {
    state.loading = data
  },
  // 更新错误数据
  RES_ERROR: (state, data) => {
    state.resError = data
      ? {
        status: data.status,
        statusText: data.statusText,
        statusCode: `${data.status} ${data.statusText}`,
        error: {
          'Response Data': data.data,
          'Request URL': data.config.url,
          'Request Method': data.config.method.toUpperCase(),
          'Form Data': qs.parse(data.config.data)
        }
      }
      : ''
  }
}

export default {state, getters, mutations}
