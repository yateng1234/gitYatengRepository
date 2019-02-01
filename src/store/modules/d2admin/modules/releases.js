import { httpGet } from '@/api/sys/http'
import semver from 'semver'
import util from '@/libs/util.js'
import setting from '@/setting.js'

export default {
  namespaced: true,
  state: {
    // SuntrayAdmin 版本
    version: setting.releases.version,
    // 最新版本的信息
    latest: {},
    // 有新版本
    update: false
  },
  actions: {
    /**
     * @description 检查版本更新
     * @param {Object} param context
     */
    checkUpdate ({ state, commit }) {
      httpGet(setting.releases.api)
        .then(res => {
          let versionGet = res.tag_name
          const update = semver.lt(state.version, versionGet)
          if (update) {
            util.log.capsule('SuntrayAdmin', `New version ${res.name}`)
            commit('updateSet', true)
          }
          commit('latestSet', res)
        })
        .catch(err => {
          console.log('checkUpdate error', err)
        })
    }
  },
  mutations: {
    /**
     * @description 显示版本信息
     * @param {Object} state vuex state
     */
    versionShow (state) {
      util.log.capsule('SuntrayAdmin', `v${state.version}`)
    },
    /**
     * @description 设置是否有新的 SuntrayAdmin 版本
     * @param {Object} state vuex state
     * @param {Boolean} update can update
     */
    updateSet (state, update) {
      // store 赋值
      state.update = update
    },
    /**
     * @description 设置最新版本的信息
     * @param {Object} state vuex state
     * @param {Object}} latest releases value
     */
    latestSet (state, latest) {
      // store 赋值
      state.latest = latest
    }
  }
}
